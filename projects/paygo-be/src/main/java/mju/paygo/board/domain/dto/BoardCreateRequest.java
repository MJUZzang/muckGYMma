package mju.paygo.board.domain.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public record BoardCreateRequest(

        @NotEmpty(message = "파일은 필수입니다.")
        List<MultipartFile> files,

        @NotBlank(message = "내용을 비워둘 수 없습니다.")
        String content
) {}
