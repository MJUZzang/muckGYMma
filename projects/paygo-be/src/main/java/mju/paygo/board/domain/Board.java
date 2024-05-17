package mju.paygo.board.domain;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import mju.paygo.likes.domain.Likes;
import mju.paygo.member.domain.member.Member;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.List;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class Board {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;    // 게시글 ID

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @Column(nullable = false)
    private String imageUrl;  // 게시글에 포함된 이미지 URL

    @Lob
    @Column(nullable = false)
    private String content;  // 게시글 내용

    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @Column(nullable = false)
    private Boolean verified = false;  // 게시글 검증 상태

    @OneToMany(mappedBy = "board", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Likes> likes;

    public Board(Member member, String imageUrl, String content, Boolean verified) {
        this.member = member;
        this.imageUrl = imageUrl;
        this.content = content;
        this.createdAt = LocalDateTime.now(ZoneId.of("Asia/Seoul"));
        this.verified = verified;
    }

    public static Board of(Member member, String imageUrl, String content, Boolean verified) {
        return new Board(member, imageUrl, content, verified);
    }

    public void updateContent(String content) {
        this.content = content;
    }
}