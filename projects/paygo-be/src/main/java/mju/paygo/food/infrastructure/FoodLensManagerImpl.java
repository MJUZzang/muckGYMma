package mju.paygo.food.infrastructure;

import mju.paygo.food.domain.FoodLensManager;
import mju.paygo.food.infrastructure.dto.FoodAnalyzeResponse;
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

import java.util.List;
import static org.springframework.http.MediaType.APPLICATION_JSON;

@Component
public class FoodLensManagerImpl implements FoodLensManager {

    @Value("${food.api-url}")
    private String url;

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
                url,
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
}
