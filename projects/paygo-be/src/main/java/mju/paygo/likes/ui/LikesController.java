package mju.paygo.likes.ui;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import mju.paygo.likes.application.LikesService;
import mju.paygo.likes.domain.dto.LikesRequest;
import mju.paygo.likes.ui.dto.LikesResponse;
import mju.paygo.member.ui.auth.support.auth.AuthMember;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RequestMapping("/api/likes")
@RestController
public class LikesController {

    private final LikesService likesService;

    @PostMapping
    public ResponseEntity<LikesResponse> toggleLike(@AuthMember final Long memberId, @Valid @RequestBody final LikesRequest request) {
        LikesResponse response = likesService.toggleLike(memberId, request.boardId());
        return ResponseEntity.ok(response);
    }
}
