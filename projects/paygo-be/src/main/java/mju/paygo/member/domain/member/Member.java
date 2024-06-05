package mju.paygo.member.domain.member;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import mju.paygo.member.exception.exceptions.member.BlankContainsException;

@Getter
@Builder
@EqualsAndHashCode(of = "id", callSuper = false)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class Member {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = true)
    private String profileImageUrl;

    @Column(unique = true, nullable = false)
    private String nickname;

    @Enumerated(value = EnumType.STRING)
    @Column(nullable = false)
    private MemberRole memberRole;

    @Column(nullable = false)
    private Boolean initialized;

    @Column(nullable = true)
    private String profileContent;  // 프로필 소개글 내용

    public boolean isAdmin() {
        return this.memberRole.isAdministrator();
    }

    public void clearInitialize() {
        this.initialized = true;
    }

    public boolean isInitialized() {
        return this.initialized;
    }

    public static Member createWithOAuthLogin(final String email,
                                              final String nickname,
                                              final String url,
                                              final String profileContent) {
        return Member.builder()
                .email(email)
                .nickname(nickname)
                .profileImageUrl(url)
                .profileContent(profileContent)
                .memberRole(MemberRole.MEMBER)
                .initialized(false)
                .build();
    }

    public void updateNickname(final String nickname) {
        if (nickname.contains(" ")) {
            throw new BlankContainsException();
        }
        this.nickname = nickname;
    }

    public void updateProfileUrl(final String url) {
        this.profileImageUrl = url;
    }
}
