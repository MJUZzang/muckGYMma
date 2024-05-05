package mju.paygo.meal.infrastructure;

import mju.paygo.meal.domain.FoodLensManager;
import mju.paygo.meal.infrastructure.dto.FoodAnalyzeResponse;
import mju.paygo.meal.infrastructure.dto.FoodSearchResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import static org.springframework.http.MediaType.APPLICATION_JSON;

@Component
public class FoodLensManagerImpl implements FoodLensManager {

    @Value("${food.predict-url}")
    private String predictUrl;

    @Value("${food.search-url}")
    private String searchUrl;

    @Value("${food.authorization}")
    private String authorization;

    @Value("${food.app-token}")
    private String appToken;

    @Value("${food.company-token}")
    private String companyToken;

    @Value("${food.api-version}")
    private String apiVersion;

    @Value("${food.app-version}")
    private String appVersion;

    @Value("${food.app-package}")
    private String appPackage;

    @Value("${food.app-device}")
    private String appDevice;

    @Value("${food.app-device-id}")
    private String appDeviceId;

    @Value("${food.user-agent}")
    private String userAgent;

    @Override
    public FoodAnalyzeResponse predict(final MultipartFile file) {
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = createFoodLensHeaders();
        MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();

        if (!file.isEmpty()) {
            body.add("file", file.getResource());
        }

        HttpEntity<MultiValueMap<String, Object>> entity = new HttpEntity<>(body, headers);
        ResponseEntity<FoodAnalyzeResponse> result = restTemplate.exchange(
                predictUrl,
                HttpMethod.POST,
                entity,
                FoodAnalyzeResponse.class
        );

        return result.getBody();
    }

    private HttpHeaders createFoodLensHeaders() {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.MULTIPART_FORM_DATA);
        headers.set("Authorization", authorization);
        headers.set("AppToken", appToken);
        headers.set("CompanyToken", companyToken);
        headers.set("ApiVersion", apiVersion);
        headers.set("AppVersion", appVersion);
        headers.set("AppPackage", appPackage);
        headers.set("AppDevice", appDevice);
        headers.set("AppDeviceId", appDeviceId);
        headers.setAccept(List.of(APPLICATION_JSON));
        headers.set("User-agent", userAgent);

        return headers;
    }

    @Override
    public FoodSearchResponse searchFoodInFoodLens(final Long[] foodIds) {
        RestTemplate restTemplate = new RestTemplate();

        HttpHeaders headers = createFoodLensHeaders();
        MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();
        HttpEntity<MultiValueMap<String, Object>> entity = new HttpEntity<>(body, headers);

        ArrayList<FoodSearchResponse> responses = new ArrayList<>();
        Arrays.stream(foodIds)
                .forEach(foodId -> {
                    ResponseEntity<FoodSearchResponse> responseEntity = restTemplate.exchange(
                            searchUrl + foodId,
                            HttpMethod.GET,
                            entity,
                            FoodSearchResponse.class
                    );
                    responses.add(responseEntity.getBody());
                });

        ArrayList<String> foodNames = new ArrayList<>();
        BigDecimal totalKcal = BigDecimal.valueOf(0);
        BigDecimal totalCarbo = BigDecimal.valueOf(0);
        BigDecimal totalProtein = BigDecimal.valueOf(0);
        BigDecimal totalFat = BigDecimal.valueOf(0);
        BigDecimal totalSodium = BigDecimal.valueOf(0);
        BigDecimal totalGram = BigDecimal.valueOf(0);

        for (FoodSearchResponse response : responses) {
            foodNames.add(response.foodName());
            totalKcal = totalKcal.add(response.kcal());
            totalCarbo = totalCarbo.add(response.carbo());
            totalProtein = totalProtein.add(response.protein());
            totalFat = totalFat.add(response.fat());
            totalSodium = totalSodium.add(response.sodium());
            totalGram = totalGram.add(response.gram());
        }

        return new FoodSearchResponse(
                joinFoodNames(foodNames),
                totalKcal,
                totalCarbo,
                totalProtein,
                totalFat,
                totalSodium,
                totalGram
        );
    }

    private String joinFoodNames(final ArrayList<String> foodNames) {
        return String.join(",", foodNames);
    }
}
