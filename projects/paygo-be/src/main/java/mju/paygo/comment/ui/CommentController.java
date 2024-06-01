package mju.paygo.comment.ui;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import mju.paygo.comment.application.CommentService;
import mju.paygo.comment.domain.Comment;
import mju.paygo.comment.domain.dto.CommentDeleteRequest;
import mju.paygo.comment.domain.dto.CommentRequest;
import mju.paygo.comment.ui.dto.CommentResponse;
import mju.paygo.member.ui.auth.support.auth.AuthMember;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@RequestMapping("/api/comments")
@RestController
public class CommentController {

    private final CommentService commentService;

    @PostMapping("/create")
    public ResponseEntity<Void> createComment(@AuthMember Long memberId, @Valid @RequestBody final CommentRequest request) {
        Comment comment = commentService.createComment(memberId, request.boardId(), request.content());
        LocalDateTime createdAt = LocalDateTime.now(ZoneId.of("Asia/Seoul"));

        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @PatchMapping("/update")
    public ResponseEntity<Void> updateComment(@AuthMember Long memberId, @Valid @RequestBody final CommentRequest request) {
        Comment comment = commentService.updateComment(memberId, request.commentId(), request.content());
        LocalDateTime updatedAt = LocalDateTime.now(ZoneId.of("Asia/Seoul"));

        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/delete")
    public ResponseEntity<Void> deleteComment(@AuthMember Long memberId, @Valid @RequestBody final CommentDeleteRequest request) {
        commentService.deleteComment(memberId, request.commentId());

        return ResponseEntity.ok().build();
    }

    @GetMapping("/comments")
    public ResponseEntity<List<CommentResponse>> getCommentsByBoard(@RequestParam Long boardId) {
        List<Comment> comments = commentService.getCommentsByBoard(boardId);
        List<CommentResponse> response = comments.stream()
                .map(comment -> new CommentResponse(
                        comment.getId(),
                        comment.getMember().getId(),
                        comment.getMember().getNickname(),
                        comment.getMember().getEmail(),
                        comment.getBoard().getId(),
                        comment.getContent(),
                        comment.getCreatedAt(),
                        comment.getUpdatedAt()
                ))
                .collect(Collectors.toList());
        return ResponseEntity.ok(response);
    }

}
