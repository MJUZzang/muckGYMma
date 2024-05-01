package mju.paygo.task.application;

import lombok.RequiredArgsConstructor;
import mju.paygo.exerciseprofile.domain.ExerciseProfile;
import mju.paygo.exerciseprofile.domain.ExerciseProfileRepository;
import mju.paygo.exerciseprofile.exception.exceptions.ExerciseProfileNotFoundException;
import mju.paygo.meal.domain.Meal;
import mju.paygo.meal.domain.MealRepository;
import mju.paygo.meal.exception.exceptions.MealNotFoundException;
import mju.paygo.member.domain.member.Member;
import mju.paygo.member.domain.member.MemberRepository;
import mju.paygo.member.exception.exceptions.member.MemberNotFoundException;
import mju.paygo.member.exception.exceptions.member.MemberNotInitializedException;
import mju.paygo.physicalprofile.domain.PhysicalProfile;
import mju.paygo.physicalprofile.domain.PhysicalProfileRepository;
import mju.paygo.physicalprofile.exception.exceptions.PhysicalProfileNotFoundException;
import mju.paygo.preferexercises.domain.PreferExercises;
import mju.paygo.preferexercises.domain.PreferExercisesRepository;
import mju.paygo.preferexercises.domain.vo.Exercise;
import mju.paygo.preferexercises.exception.exceptions.PreferExerciseNotFoundException;
import mju.paygo.prefersports.domain.PreferSports;
import mju.paygo.prefersports.domain.PreferSportsRepository;
import mju.paygo.prefersports.domain.vo.Sports;
import mju.paygo.prefersports.exception.exceptions.PreferSportsNotFoundException;
import org.springframework.ai.openai.OpenAiChatClient;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Transactional
@Service
public class TaskService {

    private final PreferSportsRepository preferSportsRepository;
    private final PreferExercisesRepository preferExercisesRepository;
    private final MemberRepository memberRepository;
    private final PhysicalProfileRepository physicalProfileRepository;
    private final ExerciseProfileRepository exerciseProfileRepository;
    private final MealRepository mealRepository;
    private final OpenAiChatClient chatClient;

    public String questionExercises(final Long memberId, final Long mealId) {
        Member member = findMemberById(memberId);
        if (!member.isInitialized()) {
            throw new MemberNotInitializedException();
        }
        PreferSports preferSports = findPreferSports(memberId);
        PreferExercises preferExercises = findPreferExercises(memberId);
        PhysicalProfile physicalProfile = findPhysicalProfile(memberId);
        ExerciseProfile exerciseProfile = findExerciseProfile(memberId);
        Meal meal = findMealById(mealId);

        String prompt = generateQuestionPrompt(member, preferSports, preferExercises, physicalProfile, exerciseProfile, meal);
        // System.out.println("prompt = " + prompt);
        return chatClient.call(prompt);
    }

    private Member findMemberById(final Long memberId) {
        return memberRepository.findById(memberId)
                .orElseThrow(MemberNotFoundException::new);
    }

    private PreferSports findPreferSports(final Long memberId) {
        return preferSportsRepository.findByMemberId(memberId)
                .orElseThrow(PreferSportsNotFoundException::new);
    }

    private PreferExercises findPreferExercises(final Long memberId) {
        return preferExercisesRepository.findByMemberId(memberId)
                .orElseThrow(PreferExerciseNotFoundException::new);
    }

    private PhysicalProfile findPhysicalProfile(final Long memberId) {
        return physicalProfileRepository.findByMemberId(memberId)
                .orElseThrow(PhysicalProfileNotFoundException::new);
    }

    private ExerciseProfile findExerciseProfile(final Long memberId) {
        return exerciseProfileRepository.findByMemberId(memberId)
                .orElseThrow(ExerciseProfileNotFoundException::new);
    }

    private Meal findMealById(final Long mealId) {
        return mealRepository.findById(mealId)
                .orElseThrow(MealNotFoundException::new);
    }

    private String generateQuestionPrompt(
            final Member member,
            final PreferSports preferSports,
            final PreferExercises preferExercises,
            final PhysicalProfile physicalProfile,
            final ExerciseProfile exerciseProfile,
            final Meal meal) {

        StringBuilder builder = new StringBuilder();
        builder.append("회원 정보는 아래와 같다.").append("\n");
        builder.append("성별: ").append(physicalProfile.getGender().getName()).append("\n");
        builder.append("생년월일: ").append(physicalProfile.getBirth().getBirthDate()).append("\n");
        builder.append("키: ").append(physicalProfile.getHeight()).append("\n");
        builder.append("현재 체중: ").append(physicalProfile.getWeight()).append("\n");
        builder.append("운동 레벨: ").append(exerciseProfile.getLevel().getName()).append("\n");
        builder.append("운동 목표: ").append(exerciseProfile.getGoal().getName()).append("\n");
        builder.append("운동 경력: ").append(exerciseProfile.getExperience().getName()).append("\n");
        builder.append("운동 빈도: ").append(exerciseProfile.getFrequency().getName()).append("\n");
        builder.append("선호 운동 (무게와 횟수 조합으로 나타내야 함 - 5kg 10번 등): ").append(preferExercises.getExercises()).append("\n");
        builder.append("선호 스포츠 (시간으로 나타내야 함 - 1시간 등): ").append(preferSports.getSports()).append("\n");
        builder.append("식사 정보는 아래와 같다.").append("\n");
        builder.append("식사 조합: ").append(meal.getMealName()).append("\n");
        builder.append("식사 조합의 칼로리: ").append(meal.getNutrient().getKcal()).append("\n");
        builder.append("주어진 회원 정보와 식사 정보를 토대로, 아래의 스포츠와 운동이 각각 몇 시간 (스포츠), 얼마의 무게 & 조합 (운동)으로 칼로리를 뺄 수 있을지 계산하라.").append("\n");
        builder.append("스포츠: ").append(Sports.collectAllNames()).append("\n");
        builder.append("운동: ").append(Exercise.collectAllNames()).append("\n");
        builder.append("위에 주어진 스포츠, 운동 목록에 대해 전부 시간 (스포츠), 무게 & 조합 (운동)을 구해야 한다. 선호 운동, 선호 스포츠에 대해서만 구하면 안 된다.").append("\n");
        builder.append("예상 답변은 아래와 같이 JSON 형식으로 나와야 한다. (기타 표현은 나오면 안 된다. JSON만 뱉어야 한다.").append("\n");
        builder.append("{\n" +
                "    \"exercise\" : {\n" +
                "        \"prefer_exercise\" : {\n" +
                "            \"플랭크\" : {\n" +
                "                \"weight\" : 0,\n" +
                "                \"minute\" : 10\n" +
                "            },\n" +
                "           ...\n" +
                "        }\n" +
                "        \"벤치프레스\" : {\n" +
                "            \"weight\" : 5,\n" +
                "            \"minute\" : 30\n" +
                "        },\n" +
                "        ...\n" +
                "    },\n" +
                "    \"sports\" : {\n" +
                "       \"prefer_sports\" : {\n" +
                "           \"야구\" : {\n" +
                "               \"minute\" : 20\n" +
                "           },\n" +
                "          ...\n" +
                "       }\n" +
                "        \"축구\" : {\n" +
                "            \"minute\" : 90\n" +
                "        }\n" +
                "        ...\n" +
                "    }\n" +
                "}").append("\n");
        builder.append("운동 종류 (exercise)는 weight (중량, kg), minute (분)으로 나타내줘야 한다.").append("\n");
        builder.append("스포츠 종류 (sports)는 minute (분)으로만 나타내줘야 한다.").append("\n");
        builder.append("주의해야 할 것은, 위의 JSON처럼 표현할 때 운동 종류 중 선호 운동은 prefer_exercise 안에, 선호 스포츠는 prefer_sports 안에만 담겨지도록 표현해야 한다.").append("\n");
        builder.append("따라서 prefer_exercise 안에 있는 내역이 exercise 안에도 나오거나, prefer_sports 안에 있는 내역이 sports 안에도 나오면 안 된다. 그 반대도 안 된다.").append("\n");
        builder.append("반드시 prefer_exercise 안에는 선호 운동만, prefer_sports 안에는 선호 스포츠로 제공된 것만 담겨지도록 해야 한다. 선호 운동으로 암 컬이 없는데 암 컬이 선호 운동에 들어가는 등의 오류를 범하면 안된다. (선호 스포츠도 마찬가지이다.)").append("\n");
        return builder.toString();
    }
}
