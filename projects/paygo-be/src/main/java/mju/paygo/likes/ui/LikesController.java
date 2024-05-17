package mju.paygo.likes.ui;

import lombok.RequiredArgsConstructor;
import mju.paygo.likes.application.LikesService;
import mju.paygo.likes.domain.dto.LikesRequest;
import mju.paygo.member.ui.auth.support.auth.AuthMember;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RequestMapping("/api/likes")
@RestController
public class LikesController {

    private static final Logger logger = LoggerFactory.getLogger(LikesController.class);

    private final LikesService likesService;

    @PostMapping("/like")
    public ResponseEntity<Void> likeBoard(@AuthMember Long memberId, @RequestBody LikesRequest request) {
        boolean success = likesService.like(memberId, request.boardId());
        if (success) {
            logger.info("Board liked successfully. Member ID: {}, Board ID: {}", memberId, request.boardId());
            return ResponseEntity.ok().build();
        } else {
            logger.warn("Board is already liked or not found. Member ID: {}, Board ID: {}", memberId, request.boardId());
            return ResponseEntity.badRequest().build();
        }
    }

    @PostMapping("/unlike")
    public ResponseEntity<Void> unlikeBoard(@AuthMember Long memberId, @RequestBody LikesRequest request) {
        boolean success = likesService.unlike(memberId, request.boardId());
        if (success) {
            logger.info("Board unliked successfully. Member ID: {}, Board ID: {}", memberId, request.boardId());
            return ResponseEntity.ok().build();
        } else {
            logger.warn("Board is not liked or not found. Member ID: {}, Board ID: {}", memberId, request.boardId());
            return ResponseEntity.badRequest().build();
        }
    }
}