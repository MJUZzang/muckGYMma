package mju.paygo.board.ui;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import mju.paygo.board.application.BoardService;
import mju.paygo.board.domain.Board;
import mju.paygo.board.domain.dto.BoardCreateRequest;
import mju.paygo.board.domain.dto.BoardCreateWithMealRequest;
import mju.paygo.board.domain.dto.BoardDeleteRequest;
import mju.paygo.board.domain.dto.BoardUpdateRequest;
import mju.paygo.board.exception.exceptions.InvalidMemberIdException;
import mju.paygo.board.exception.exceptions.MaxFileUploadLimitExceededException;
import mju.paygo.board.ui.dto.BoardFindResponse;
import mju.paygo.meal.domain.S3Uploader;
import mju.paygo.member.domain.member.Member;
import mju.paygo.member.domain.member.MemberRepository;
import mju.paygo.member.ui.auth.support.auth.AuthMember;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
@RequestMapping("/api/board")
@RestController
public class BoardController {
    private final BoardService boardService;
    private final S3Uploader s3Uploader;
    private final MemberRepository memberRepository;

    // 게시글 생성(사진과 함께)
    @PostMapping("/create")
    public ResponseEntity<Void> createBoard(@ModelAttribute @Valid BoardCreateRequest request, @AuthMember final Long memberId) {

        if (request.files().size() > 10) {
            throw new MaxFileUploadLimitExceededException();
        }

        Member member = memberRepository.findById(memberId)
                .orElseThrow(InvalidMemberIdException::new);

        List<String> fileUrls = new ArrayList<>();
        for (MultipartFile file : request.files()) {
            String fileUrl = s3Uploader.outerUpload(file, memberId);
            fileUrls.add(fileUrl);
        }

        Board board = boardService.saveBoard(member, fileUrls, request.content());

        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    // 게시글 생성(Meal의 id 사용)
    @PostMapping("/create-with-meal")
    public ResponseEntity<Void> createBoardFromMeal(@AuthMember final Long memberId, @ModelAttribute @Valid BoardCreateWithMealRequest request) {

        if (request.files().size() > 10) {
            throw new MaxFileUploadLimitExceededException();
        }

        Member member = memberRepository.findById(memberId)
                .orElseThrow(InvalidMemberIdException::new);

        List<String> fileUrls = new ArrayList<>();
        for (MultipartFile file : request.files()) {
            String fileUrl = s3Uploader.outerUpload(file, memberId);
            fileUrls.add(fileUrl);
        }

        Board board = boardService.saveBoardWithMeal(member, request.mealId(), request.content(), fileUrls);

        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @PatchMapping("/update")
    public ResponseEntity<Void> updateBoard(@AuthMember final Long memberId, @Valid @RequestBody final BoardUpdateRequest updateRequest) {
        boardService.updateBoard(updateRequest.boardId(), memberId, updateRequest.content(), updateRequest.Files());

        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/delete")
    public ResponseEntity<Void> deleteBoard(@AuthMember final Long memberId, @Valid @RequestBody final BoardDeleteRequest request) {
        boardService.deleteBoard(memberId, request.boardId());

        return ResponseEntity.ok().build();
    }

    @GetMapping("/my-posts")
    public ResponseEntity<List<BoardFindResponse>> getMyPosts(@AuthMember final Long memberId) {
        List<BoardFindResponse> boards = boardService.findAllByMemberId(memberId);
        return ResponseEntity.ok(boards);
    }

    @GetMapping("/other-posts")
    public ResponseEntity<List<BoardFindResponse>> getOtherPosts(@AuthMember final Long memberId) {
        List<BoardFindResponse> boards = boardService.findAllExceptMemberId(memberId);

        return ResponseEntity.ok(boards);
    }

    @GetMapping("/following-posts")
    public ResponseEntity<List<BoardFindResponse>> getFollowingPosts(@AuthMember final Long memberId) {
        List<BoardFindResponse> boards = boardService.findAllByFollowing(memberId);

        return ResponseEntity.ok(boards);
    }

}
