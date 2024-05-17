package mju.paygo.follow.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import mju.paygo.member.domain.member.Member;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class Follow {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "follower_id", nullable = false)
    private Member follower;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "followee_id", nullable = false)
    private Member followee;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private FollowStatus status;

    private Follow(final Member follower, final Member followee, final FollowStatus status) {
        this.follower = follower;
        this.followee = followee;
        this.status = status;
    }

    public static Follow of(final Member follower, final Member followee, final FollowStatus status) {
        return new Follow(follower, followee, status);
    }

    public void accept() {
        this.status = FollowStatus.ACCEPTED;
    }

    public void reject() {
        this.status = FollowStatus.REJECTED;
    }
}
