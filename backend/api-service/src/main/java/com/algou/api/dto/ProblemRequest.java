package com.algou.api.dto;

import com.algou.api.entity.Difficulty;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ProblemRequest {
    @NotBlank(message = "Title is required")
    private String title;

    @NotBlank(message = "Statement is required")
    private String statement;

    @NotNull(message = "Difficulty is required")
    private Difficulty difficulty;

    private String constraints;
}
