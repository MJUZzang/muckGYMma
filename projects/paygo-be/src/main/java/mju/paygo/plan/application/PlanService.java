package mju.paygo.plan.application;

import lombok.RequiredArgsConstructor;
import mju.paygo.exerciseprofile.domain.ExerciseProfile;
import mju.paygo.exerciseprofile.domain.ExerciseProfileRepository;
import mju.paygo.exerciseprofile.exception.exceptions.ExerciseProfileNotFoundException;
import mju.paygo.global.event.Events;
import mju.paygo.meal.domain.Meal;
import mju.paygo.meal.domain.MealRepository;
import mju.paygo.meal.event.PlanClearedEvent;
import mju.paygo.meal.exception.exceptions.MealNotFoundException;
import mju.paygo.member.domain.member.Member;
import mju.paygo.member.domain.member.MemberRepository;
import mju.paygo.member.exception.exceptions.member.MemberNotFoundException;
import mju.paygo.member.exception.exceptions.member.MemberNotInitializedException;
import mju.paygo.physicalprofile.domain.PhysicalProfile;
import mju.paygo.physicalprofile.domain.PhysicalProfileRepository;
import mju.paygo.physicalprofile.exception.exceptions.PhysicalProfileNotFoundException;
import mju.paygo.plan.application.dto.PlanCreateRequest;
import mju.paygo.plan.domain.Plan;
import mju.paygo.plan.domain.PlanRepository;
import mju.paygo.plan.domain.Task;
import mju.paygo.plan.exception.exceptions.PlanAlreadyExistedException;
import mju.paygo.plan.exception.exceptions.PlanNotFoundException;
import mju.paygo.plan.exception.exceptions.TaskNotFoundException;
import mju.paygo.preferexercises.domain.PreferExercises;
import mju.paygo.preferexercises.domain.PreferExercisesRepository;
import mju.paygo.preferexercises.exception.exceptions.PreferExerciseNotFoundException;
import mju.paygo.prefersports.domain.PreferSports;
import mju.paygo.prefersports.domain.PreferSportsRepository;
import mju.paygo.prefersports.exception.exceptions.PreferSportsNotFoundException;
import org.springframework.ai.chat.ChatClient;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Transactional
@Service
public class PlanService {

    private final PreferSportsRepository preferSportsRepository;
    private final PreferExercisesRepository preferExercisesRepository;
    private final MemberRepository memberRepository;
    private final PhysicalProfileRepository physicalProfileRepository;
    private final ExerciseProfileRepository exerciseProfileRepository;
    private final PlanRepository planRepository;
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
        builder.append("너는 20년 이상의 운동, 식단 생성 경력을 가진 고급 영양사이자 헬스 트레이너이다.").append("\n");
        builder.append("회원 정보는 아래와 같다.").append("\n");
        builder.append("성별: ").append(physicalProfile.getGender()).append("\n");
        builder.append("생년월일: ").append(physicalProfile.getBirth()).append("\n");
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
        builder.append("3. 빼야 할 칼로리를 충분히 소비할 수 있는 플랜을 구성할 것.").append("\n");
        builder.append("4. 빼야 할 칼로리가 너무 높고 사용자의 운동 경험으로 운동 플랜을 충분히 해낼 수 없다고 판단되면, 운동플랜의 강도를 조금 낮추어 구성해줄 것.").append("\n");
        builder.append("5. 유저의 선호 운동들과 비슷한 난이도를 가진 헬스 운동을 너가 유도리 있게 추가하는 것을 허락한다.").append("\n");
        builder.append("6. 유저가 선정한 선호 스포츠 이외의 스포츠는 추천하지 말 것. 유저는 선정한 스포츠만 할 수 있음").append("\n");
        builder.append("7. 선정한 스포츠가 계절에 맞지 않는 종목이라면 제외할 것.").append("\n");
        builder.append("8. 스포츠 플랜을 하나 이상 꼭 포함해줄 것.").append("\n");
        builder.append("9. 스포츠 플랜 안에는 하나의 스포츠 종목만으로 구성할 것.").append("\n");
        builder.append("10. Plan interface의 필드명 중 \"type\" 필드의 값은 \"스포츠\" 또는 \"헬스\"로만 구성할 것.").append("\n");
        builder.append("그리고 각 workouts의 요소 당 칼로리를 얼마나 뺄 수 있게 되는지도 각 운동의 요소에 'expect' 속성에 '반드시' 넣어줘. 각 workout의 weight, set, time 등을 모두 고려하여 expect를 추산한다.").append("\n");
        builder.append("예를 들어 테니스를 60분 간 할 경우 (name: 테니스, time: 3600), expect는 728이 된다. 다만 이는 음식마다 무조건 이렇게 728만큼 주는 게 아니라, 음식의 칼로리만큼만 계산할 수 있도록 해야 한다. 그럴 때는 kcal이 줄어든만큼 time도 줄어야 한다.").append("\n");
        builder.append("'expect'를 만들 때 주의할 점은, 같은 plan 안에 있는 workouts들의 expect 속성의 합이 빼야 할 칼로리보다 같거나 커야 해. 절대 합이 빼야 할 칼로리보다 작으면 안돼").append("\n");
        builder.append("'expect'의 총합이 그렇다고 너무 크면 안 돼. 빼야 할 칼로리 + 50 정도까지만 허용되게 한다. 그러기 위해서는 weight, set, time을 줄이는 방법 등도 있다.").append("\n");
        builder.append("type이 스포츠일 때 workouts들의 time은 '초' 단위여야 해. 그리고 time일 때 expect가 빼야 할 칼로리와 다른 경우가 있는데 이 점도 보완해야 해").append("\n");
        builder.append("만약 그럼에도 각각의 plan들의 workouts들의 expect 합이 빼야 할 칼로리보다 작은 경우가 있다면, weight, set, time들을 늘리는 방식으로라도 해서 expect를 늘리는 방식으로 해").append("\n");
        builder.append("interface Workout {\n")
                .append("\tname: string;\n")
                .append("\trepeatation: number;\n")
                .append("\tweight?: number;\n")
                .append("\tset: number;\n")
                .append("\ttime?: number;\n")
                .append("}\n\n")
                .append("interface Plan {\n")
                .append("\ttype: string;\n")
                .append("\tworkouts: Workout[];\n")
                .append("}");
        builder.append("절대 각 plan에 있는 workouts의 expect 총합이 빼야 할 칼로리보다 작게 나오면 안 된다.").append("\n");
        builder.append("예시로, 257kcal 정도의 칼로리를 가진 닭갈비를 먹었을 경우에는 각 workouts의 expect 총합들이 모두 257kcal에 근접해야 한다.").append("\n");
        builder.append("이 요구사항은 헬스 말고도 스포츠에도 동일하다. 스포츠 workouts 또한 expect 총합들이 모두 음식 칼로리 (예: 닭갈비일 경우 257kcal)에 근접하도록 해야 한다.").append("\n");
        builder.append("고급 경력을 가진 만큼, 충분히 expect들을 적절히 고려할 수 있을 것이라 생각한다. expect 총합을 최대한 음식 칼로리에 맞추도록 생성해라.").append("\n");
        builder.append("반환할 때, json만 나오도록 해라. 겉부분에 ```json 같은 게 있으면 안 된다.").append("\n");
        builder.append("type이 헬스일 때에는 time을 너가 예상해서 만들어줘. 예시로 벤치프레스를 20kg로 10번씩 3세트 할 경우 걸리는 시간 (초)가 있겠지? 그 값을 time으로 넣어주면 돼.").append("\n");
        return builder.toString();
    }

    public Plan addPlan(final Long memberId, final Long mealId, final PlanCreateRequest request) {
        if (planRepository.isAlreadyExisted(memberId, mealId)) {
            throw new PlanAlreadyExistedException();
        }

        List<Task> list = request.workouts()
                .stream()
                .map(workout -> Task.of(memberId, request.type(), workout))
                .toList();
        List<Task> tasks = new ArrayList<>(list);
        String planName;
        if (request.type().equals("헬스")) {
            planName = "헬스";
        } else {
            planName = request.type();
        }
        Plan plan = Plan.of(memberId, mealId, tasks, planName);
        Meal meal = mealRepository.findByMemberAndId(memberId, mealId)
                .orElseThrow(MealNotFoundException::new);
        meal.updatePlaned();

        return planRepository.save(plan);
    }

    public void doneTask(final Long memberId, final Long taskId, final int time) {
        Plan plan = findPlanByMemberAndTask(memberId, taskId);
        Task task = findTaskById(taskId, plan);
        task.done(time);
        if (isAllTaskCleared(plan)) {
            plan.clear();
            Events.raise(new PlanClearedEvent(memberId, plan.getMealId()));
        }
    }

    private Plan findPlanByMemberAndTask(final Long memberId, final Long taskId) {
        return planRepository.findPlanByMemberAndTask(memberId, taskId)
                .orElseThrow(PlanNotFoundException::new);
    }

    private Task findTaskById(final Long taskId, final Plan plan) {
        return plan.getTasks()
                .stream()
                .filter(task -> task.isSame(taskId))
                .findAny()
                .orElseThrow(TaskNotFoundException::new);
    }

    private boolean isAllTaskCleared(final Plan plan) {
        List<Task> clearedTask = plan.getTasks()
                .stream()
                .filter(Task::isCleared)
                .toList();
        return clearedTask.size() == plan.getTasks().size();
    }

    public Plan findPlanByMemberAndId(final Long memberId, final Long planId) {
        return planRepository.findPlanByMemberAndId(memberId, planId)
                .orElseThrow(PlanNotFoundException::new);
    }

    public List<Plan> remainPlans(final Long memberId) {
        return planRepository.findPlansByMemberIdAndStatus(memberId, false);
    }

    public List<Plan> allPlans(final Long memberId) {
        return planRepository.findAllByMemberId(memberId);
    }

    public Long findPlanIdByMemberAndMeal(final Long memberId, final Long mealId) {
        Optional<Plan> plan = planRepository.findPlanByMemberAndMeal(memberId, mealId);
        if (plan.isEmpty()) {
            return null;
        }
        return plan.get().getId();
    }
}
