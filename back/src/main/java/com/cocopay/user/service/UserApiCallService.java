package com.cocopay.user.service;

import com.cocopay.payment.dto.res.PerformanceResponseListDto;
import com.cocopay.user.dto.response.UserCardResponseListDto;
import com.cocopay.user.entity.User;
import com.cocopay.user.repository.UserRepository;
import com.cocopay.usercard.entity.UserCard;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserApiCallService {

    private final UserRepository userRepository;

    @Value("${bank.local-url}")
    private String localUrl;

    @Value("${bank.url}")
    private String url;

    public UserCardResponseListDto getUserCardFromBank(Integer userId)
    {
        User findUser = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("유저 찾을수없음"));
        Integer uuid = findUser.getUuid();

        WebClient webClient = WebClient.create();

        return webClient.get()
                .uri(localUrl + "card/card-list/" + uuid)
                .retrieve()
                .bodyToMono(UserCardResponseListDto.class)
                .block();
    }
}