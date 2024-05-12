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
import mju.paygo.preferexercises.exception.exceptions.PreferExerciseNotFoundException;
import mju.paygo.prefersports.domain.PreferSports;
import mju.paygo.prefersports.domain.PreferSportsRepository;
import mju.paygo.prefersports.exception.exceptions.PreferSportsNotFoundException;
import org.springframework.ai.chat.ChatClient;
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
    private final ChatClient chatClient;

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

        String prompt = generateQuestionPrompt(preferSports, preferExercises, physicalProfile, exerciseProfile, meal);
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
        builder.append("빼야 할 칼로리: ").append(meal.getNutrient().getKcal()).append("\n");
        builder.append("위 회원 정보와 목표 칼로리를 토대로, 아래 json 포맷으로 답변을 해줘. json 답변 이외의 답변은 하지 말아줘.").append("\n");
        builder.append("추가 요구사항은 다음과 같아.").append("\n");
        builder.append("1. 유저 정보와 유저의 운동 경력을 참고하여 운동 플랜을 만들 것.").append("\n");
        builder.append("2. 최소 3개~최대 5개의 플랜들을 만들어 줄 것.").append("\n");
        builder.append("3. 목표 칼로리를 충분히 소비할 수 있는 플랜을 구성할 것.").append("\n");
        builder.append("4. 목표 칼로리가 너무 높고 사용자의 운동 경험으로 운동 플랜을 충분히 해낼 수 없다고 판단되면, 운동플랜의 강도를 조금 낮추어 구성해줄 것.").append("\n");
        builder.append("5. 유저의 선호 운동들과 비슷한 난이도를 가진 헬스 운동을 너가 유도리 있게 추가하는 것을 허락한다.").append("\n");
        builder.append("6. 유저가 선정한 선호 스포츠 이외의 스포츠는 추천하지 말 것. 유저는 선정한 스포츠만 할 수 있음").append("\n");
        builder.append("7. 선정한 스포츠가 계절에 맞지 않는 종목이라면 제외할 것.").append("\n");
        builder.append("8. 스포츠 플랜을 하나 이상 꼭 포함해줄 것.").append("\n");
        builder.append("9. 스포츠 플랜 안에는 하나의 스포츠 종목만으로 구성할 것.").append("\n");
        builder.append("10. Plan interface의 필드명 중 \"type\" 필드의 값은 \"스포츠\" 또는 \"헬스\"로만 구설할 것.").append("\n");
        builder.append("interface Workout {\n")
                .append("\tname: string;\n")
                .append("\trepeatation: number;\n")
                .append("\tweight?: number;\n")
                .append("\tset: number;\n")
                .append("\ttime?: number;\n")
                .append("}\n\n")
                .append("interface Plan {\n")
                .append("\ttype: string;\n")
                .append("\tworkouts: Workout[] | Workout;\n")
                .append("}");
        return builder.toString();
    }
}
