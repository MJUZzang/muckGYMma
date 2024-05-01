package mju.paygo.prefersports.domain;

import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import mju.paygo.prefersports.domain.vo.Sports;
import mju.paygo.prefersports.exception.exceptions.SportsDuplicateException;

import java.util.HashSet;
import java.util.List;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class PreferSports {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long memberId;

    @ElementCollection
    @Enumerated(value = EnumType.STRING)
    private List<Sports> sports;

    private PreferSports(final Long memberId, final List<Sports> sports) {
        this.memberId = memberId;
        this.sports = sports;
    }

    public static PreferSports of(final Long memberId, final List<String> sportsName) {
        List<Sports> sports = sportsName.stream()
                .map(Sports::findByName)
                .toList();
        validateIsNotDuplicate(sports);

        return new PreferSports(memberId, sports);
    }

    private static void validateIsNotDuplicate(final List<Sports> sports) {
        HashSet<Sports> set = new HashSet<>(sports);
        if (set.size() != sports.size()) {
            throw new SportsDuplicateException();
        }
    }

    public void edit(final List<String> sportsName) {
        List<Sports> sports = sportsName.stream()
                .map(Sports::findByName)
                .toList();
        validateIsNotDuplicate(sports);

        this.sports = sports;
    }
}
