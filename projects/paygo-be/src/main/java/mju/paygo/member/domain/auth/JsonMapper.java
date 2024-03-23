package mju.paygo.member.domain.auth;

import mju.paygo.member.infrastructure.auth.dto.MemberInfoKeyWordRequest;
import mju.paygo.member.infrastructure.auth.dto.MemberInfoResponse;

public interface JsonMapper {

    String getValueByKey(final String json, final String key);

    MemberInfoResponse extractMemberInfoFrom(final String memberInfoResponse,
                                             final MemberInfoKeyWordRequest memberInfoKeyWordRequest);
}
