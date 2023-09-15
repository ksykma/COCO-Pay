package com.bank.cardhistory.controller;

import com.bank.cardhistory.dto.HistoryFindDto;
import com.bank.cardhistory.entity.CardHistory;
import com.bank.cardhistory.mapper.CardHistoryMapper;
import com.bank.cardhistory.service.CardHistoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@Controller
@RequestMapping("/bank/card-history")
@RequiredArgsConstructor
public class CardHistoryController {

    private final CardHistoryService cardHistoryService;
    private final CardHistoryMapper cardHistoryMapper;

    //카드 결제 내역 조회
    @PostMapping("")
    ResponseEntity<?> getCardHistoryByMonth(@RequestBody HistoryFindDto historyFindDto)
    {
        List<CardHistory> result = cardHistoryService.getCardHistory(historyFindDto);

        return ResponseEntity.ok(cardHistoryMapper.toDtoList(result));
    }
}