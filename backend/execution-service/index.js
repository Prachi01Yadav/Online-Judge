const express = require('express');
const cors = require('cors');
const { execFile, exec } = require('child_process');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('crypto');

const app = express();
app.use(cors());
app.use(express.json());

// For generating short UUIDs if needed, or just use Date.now()
const generateId = () => Math.random().toString(36).substring(2, 15);

app.post('/execute', (req, res) => {
    const { code, input } = req.body;
    
    if (!code) {
        return res.status(400).json({ error: 'Code is required' });
    }

    const id = generateId();
    const dirPath = path.join(__dirname, 'temp', id);
    
    // Create isolated directory for this execution
    fs.mkdirSync(dirPath, { recursive: true });
    
    const sourceFilePath = path.join(dirPath, 'main.cpp');
    const executablePath = path.join(dirPath, 'main');
    const inputFilePath = path.join(dirPath, 'input.txt');
    
    fs.writeFileSync(sourceFilePath, code);
    fs.writeFileSync(inputFilePath, input || '');

    const startTime = Date.now();

    // Compile the code
    exec(`g++ ${sourceFilePath} -o ${executablePath}`, (compileError, compileStdout, compileStderr) => {
        if (compileError) {
            fs.rmSync(dirPath, { recursive: true, force: true });
            return res.json({
                stdout: '',
                stderr: compileStderr || compileError.message,
                exitCode: 1,
                timeMs: Date.now() - startTime
            });
        }

        // Execute the code
        // We use a bash command to pipe input.txt into the executable
        // Timeout is set to 5000ms (5 seconds) to prevent infinite loops
        exec(`${executablePath} < ${inputFilePath}`, { timeout: 5000 }, (runError, runStdout, runStderr) => {
            const timeMs = Date.now() - startTime;
            
            // Clean up
            fs.rmSync(dirPath, { recursive: true, force: true });

            if (runError) {
                let stderr = runStderr;
                if (runError.killed) {
                    stderr = 'Error: Execution timed out (exceeded 5 seconds).';
                } else if (!stderr) {
                    stderr = runError.message;
                }
                
                return res.json({
                    stdout: runStdout,
                    stderr: stderr,
                    exitCode: runError.code || 1,
                    timeMs
                });
            }

            return res.json({
                stdout: runStdout,
                stderr: runStderr,
                exitCode: 0,
                timeMs
            });
        });
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Execution service running on port ${PORT}`);
});
