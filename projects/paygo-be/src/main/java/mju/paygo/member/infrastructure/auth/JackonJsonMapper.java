package mju.paygo.member.infrastructure.auth;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import mju.paygo.member.domain.auth.JsonMapper;
import mju.paygo.member.exception.exceptions.auth.JsonDataInvalidException;
import mju.paygo.member.infrastructure.auth.dto.MemberInfoKeyWordRequest;
import mju.paygo.member.infrastructure.auth.dto.MemberInfoResponse;
import org.springframework.stereotype.Component;

import java.util.Arrays;

@Component
public class JackonJsonMapper implements JsonMapper {

    private static final String DELIMITER = "\\.";

    @Override
    public String getValueByKey(final String json, final String key) {
        ObjectMapper objectMapper = new ObjectMapper();

        try {
            JsonNode jsonNode = objectMapper.readTree(json);
            return jsonNode.get(key)
                    .asText();
        } catch (JsonProcessingException exception) {
            throw new JsonDataInvalidException();
        }
    }

    @Override
    public MemberInfoResponse extractMemberInfoFrom(final String memberInfoResponse,
                                                    final MemberInfoKeyWordRequest memberInfoKeyWordRequest) {
        ObjectMapper objectMapper = new ObjectMapper();

        try {
            JsonNode jsonNode = objectMapper.readTree(memberInfoResponse);
            String email = getValue(memberInfoKeyWordRequest.emailKeyWord(), jsonNode);
            String nickname = getValue(memberInfoKeyWordRequest.nicknameKeyWord(), jsonNode);
            return new MemberInfoResponse(email, nickname);

        } catch (JsonProcessingException exception) {
            throw new JsonDataInvalidException();
        }
    }

    private String getValue(final String keyWord, final JsonNode jsonNode) {

        return Arrays.stream(keyWord.split(DELIMITER))
                .reduce(jsonNode, JsonNode::get, (parentPath, childPath) -> childPath)
                .asText();
    }
}
