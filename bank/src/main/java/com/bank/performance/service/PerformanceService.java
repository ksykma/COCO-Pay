package com.bank.performance.service;

import com.bank.card.entity.Card;
import com.bank.card.repository.card.CardRepository;
import com.bank.performance.dto.PerformanceRegistDto;
import com.bank.performance.dto.PerformanceResponseDto;
import com.bank.performance.entity.Performance;
import com.bank.performance.repository.PerformanceRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@Slf4j
@RequiredArgsConstructor
public class PerformanceService {

    private final PerformanceRepository performanceRepository;
    private final CardRepository cardRepository;

    //실적 등록
    public void registPerformance(PerformanceRegistDto performanceRegistDto)
    {
        Integer cardId = performanceRegistDto.getCardId();
        Optional<Card> card = cardRepository.findById(cardId);

        Performance performance = Performance.builder()
                .card(card.get())
                .level(performanceRegistDto.getLevel())
                .levelPrice(performanceRegistDto.getLevelPrice())
                .build();
        performanceRepository.save(performance);
    }

    //실적 조회
    public List<Performance> findPerformance(Integer id, Integer cardId, Integer level){
        List<Performance> findPerformance = performanceRepository.findPerformance(id,cardId,level);
        return findPerformance;
    }

    //실적 전체 조회
    public List<PerformanceResponseDto> findPerformanceList(List<Integer> cardUuidList){
        log.info("cardUuidList : {}", cardUuidList);
        return performanceRepository.findPerformanceByCardList(cardUuidList);

    }
}
