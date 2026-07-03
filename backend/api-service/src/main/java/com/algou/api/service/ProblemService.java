package com.algou.api.service;

import com.algou.api.dto.ProblemRequest;
import com.algou.api.dto.ProblemResponse;
import com.algou.api.entity.Problem;
import com.algou.api.entity.User;
import com.algou.api.exception.ResourceNotFoundException;
import com.algou.api.repository.ProblemRepository;
import com.algou.api.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ProblemService {

    private final ProblemRepository problemRepository;
    private final UserRepository userRepository;

    public Page<ProblemResponse> list(Pageable pageable) {
        return problemRepository.findAll(pageable)
                .map(this::mapToProblemResponse);
    }

    public ProblemResponse getById(Long id) {
        Problem problem = problemRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Problem not found with id " + id));
        return mapToProblemResponse(problem);
    }

    public ProblemResponse create(ProblemRequest request, String userEmail) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        Problem problem = Problem.builder()
                .title(request.getTitle())
                .statement(request.getStatement())
                .difficulty(request.getDifficulty())
                .constraints(request.getConstraints())
                .createdBy(user)
                .build();

        Problem savedProblem = problemRepository.save(problem);
        return mapToProblemResponse(savedProblem);
    }

    public ProblemResponse update(Long id, ProblemRequest request) {
        Problem problem = problemRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Problem not found with id " + id));

        problem.setTitle(request.getTitle());
        problem.setStatement(request.getStatement());
        problem.setDifficulty(request.getDifficulty());
        problem.setConstraints(request.getConstraints());

        Problem updatedProblem = problemRepository.save(problem);
        return mapToProblemResponse(updatedProblem);
    }

    public void delete(Long id) {
        if (!problemRepository.existsById(id)) {
            throw new ResourceNotFoundException("Problem not found with id " + id);
        }
        problemRepository.deleteById(id);
    }

    private ProblemResponse mapToProblemResponse(Problem problem) {
        return new ProblemResponse(
                problem.getId(),
                problem.getTitle(),
                problem.getStatement(),
                problem.getDifficulty(),
                problem.getConstraints(),
                problem.getCreatedBy().getName(),
                problem.getCreatedAt(),
                problem.getUpdatedAt()
        );
    }
}
