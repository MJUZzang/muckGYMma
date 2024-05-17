package mju.paygo.likes.ui;

import lombok.RequiredArgsConstructor;
import mju.paygo.likes.application.LikesService;
import mju.paygo.likes.domain.dto.LikesRequest;
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

    @PostMapping("/like")
    public ResponseEntity<Void> likeBoard(@AuthMember final Long memberId, @RequestBody final LikesRequest request) {
        if (likesService.like(memberId, request.boardId())) {
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.badRequest().build();
    }

    @PostMapping("/unlike")
    public ResponseEntity<Void> unlikeBoard(@AuthMember final Long memberId, @RequestBody final LikesRequest request) {
        if (likesService.unlike(memberId, request.boardId())) {
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.badRequest().build();
    }
}
