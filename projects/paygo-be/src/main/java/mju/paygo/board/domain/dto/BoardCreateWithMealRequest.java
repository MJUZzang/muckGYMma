package mju.paygo.board.domain.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public record BoardCreateWithMealRequest(

        @NotNull(message = "Meal ID를 입력해 주세요.")
        Long mealId,

        @NotEmpty(message = "파일은 필수입니다.")
        List<MultipartFile> files,

        @NotBlank(message = "내용을 비워둘 수 없습니다.")
        String content,

        @NotNull(message = "식사 이미지를 입력해 주세요.")
        String mealImage
) {
}
