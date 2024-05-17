package mju.paygo.board.ui;

import lombok.RequiredArgsConstructor;
import mju.paygo.board.application.BoardService;
import mju.paygo.board.domain.Board;
import mju.paygo.board.domain.dto.BoardDeleteRequest;
import mju.paygo.board.domain.dto.BoardUpdateRequest;
import mju.paygo.board.exception.exceptions.InvalidBoardIdException;
import mju.paygo.board.exception.exceptions.InvalidMemberIdException;
import mju.paygo.board.ui.dto.BoardFindResponse;
import mju.paygo.comment.domain.CommentRepository;
import mju.paygo.likes.application.LikesService;
import mju.paygo.meal.domain.MealRepository;
import mju.paygo.meal.domain.S3Uploader;
import mju.paygo.member.domain.member.Member;
import mju.paygo.member.domain.member.MemberRepository;
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
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RequiredArgsConstructor
@RequestMapping("/api/board")
@RestController
public class BoardController {

    private final BoardService boardService;
    private final S3Uploader s3Uploader;
    private final MemberRepository memberRepository;
    private final MealRepository mealRepository;
    private final LikesService likesService;
    private final CommentRepository commentRepository;

    // 게시글 생성(사진과 함께)
    @PostMapping("/create")
    public ResponseEntity<Void> createBoard(@RequestParam("file") final MultipartFile file, @RequestParam("content") final String content, @AuthMember final Long memberId) {
        Member member = memberRepository.findById(memberId)
                .orElseThrow(InvalidMemberIdException::new);

        String fileUrl = s3Uploader.outerUpload(file, memberId);

        Board board = new Board(member, fileUrl, content, false);
        boardService.save(board);

        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    // 게시글 생성(Meal의 id 사용)
    // TODO: mealID를 받아서 다시 테스트해봐야함.
    /*
    @PostMapping("/create-with-meal")
    public ResponseEntity<Void> createBoardWithMeal(@RequestParam("mealId") final Long mealId, @RequestParam("content") final String content, @AuthMember final Long memberId) {

        Meal meal = mealRepository.findById(mealId).orElseThrow();
        Member member = memberRepository.findById(memberId).orElseThrow();

        if (!meal.getPosted() && meal.getMemberId().equals(memberId)) {
            Board board = new Board(member, meal.getImageUrl(), content, false);
            boardService.save(board);
            meal.clearUpload();  // posted를 true로 설정

            // 초기화 작업
            long likeCount = 0L;
            boolean isLikedByMember = false;
            long commentCount = 0L;

            logger.info("Board created successfully. Board ID: {}, Created At: {}, Content: {}, Member ID: {}, Member Nickname: {}, Member Email: {}, Likes: {}, Is Liked: {}, Comments: {}",
                    board.getId(),
                    board.getCreatedAt(),
                    board.getContent(),
                    member.getId(),
                    member.getNickname(),
                    member.getEmail(),
                    likeCount,
                    isLikedByMember,
                    commentCount);

            return ResponseEntity.status(HttpStatus.CREATED).build();
        }

        return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
    }*/

    @PatchMapping("/update")
    public ResponseEntity<Void> updateBoard(@AuthMember final Long memberId, @RequestBody final BoardUpdateRequest updateRequest) {
        boardService.updateBoard(updateRequest.boardId(), memberId, updateRequest.content());

        Board board = boardService.findById(updateRequest.boardId())
                .orElseThrow(InvalidBoardIdException::new);

        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/delete")
    public ResponseEntity<Void> deleteBoard(@AuthMember final Long memberId, @RequestBody final BoardDeleteRequest request) {
        boardService.deleteBoard(request.boardId());

        return ResponseEntity.ok().build();
    }

    // 자신이 올린 게시글만 불러오기
    @GetMapping("/my-posts")
    public ResponseEntity<List<BoardFindResponse>> getMyPosts(@RequestParam final String nickname) {
        List<BoardFindResponse> boards = boardService.findAllByNickname(nickname);

        return ResponseEntity.ok(boards);
    }

    // 자신이 올린 게시글을 제외한 나머지 글들만 불러오기
    @GetMapping("/other-posts")
    public ResponseEntity<List<BoardFindResponse>> getOtherPosts(@RequestParam final String nickname) {
        List<BoardFindResponse> boards = boardService.findAllExceptNickname(nickname);

        return ResponseEntity.ok(boards);
    }
}
