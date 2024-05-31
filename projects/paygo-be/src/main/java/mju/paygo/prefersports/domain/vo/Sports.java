package mju.paygo.prefersports.domain.vo;

import lombok.Getter;
import mju.paygo.prefersports.exception.exceptions.SportsNotFoundException;

import java.util.Arrays;
import java.util.stream.Collectors;

@Getter
public enum Sports {

    SOCCER("축구"),
    BASKETBALL("농구"),
    BASEBALL("야구"),
    VOLLEYBALL("배구"),
    TENNIS("테니스"),
    PINGPONG("탁구"),
    BALLING("볼링"),
    SWIMMING("수영"),
    HIKING("등산"),
    CYCLING("자전거"),
    RUNNING("런닝"),
    YOGA("요가"),
    PILATES("필라테스"),
    CROSSFIT("크로스핏"),
    HANDBALL("핸드볼"),
    DANCE("댄스"),
    BOXING("복싱"),
    MMA("격투기"),
    KICKBOXING("킥복싱"),
    WATERSKI("수상스키"),
    SNOWBOARD("스노보드"),
    SKI("스키"),
    SURFING("서핑"),
    SKATEBOARD("스케이트보드"),
    SKATING("스케이팅");

    private final String name;

    Sports(final String name) {
        this.name = name;
    }

    public static Sports findByName(final String name) {
        return Arrays.stream(values())
                .filter(sports -> sports.isSame(name))
                .findAny()
                .orElseThrow(SportsNotFoundException::new);
    }

    public static String collectAllNames() {
        return Arrays.stream(values())
                .map(Sports::getName)
                .collect(Collectors.joining(", "));
    }

    public boolean isSame(final String name) {
        return name.equals(this.name);
    }
}
