package com.bank.card.repository.usercard;

import com.bank.benefit.dto.BenefitInfoResponseDto;
import com.bank.card.dto.CardFindDto;
import com.bank.card.dto.PerformanceResponseDto;
import com.bank.card.dto.UserCardDto;
import com.bank.card.dto.UserCardResponseDto;
import com.bank.card.entity.CardType;
import com.bank.card.entity.UserCard;

import com.bank.performance.dto.PerformanceResponseListDto;
import com.querydsl.core.types.Expression;
import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.core.types.dsl.CaseBuilder;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;


import java.util.List;
import java.util.Optional;

import static com.bank.card.entity.QUserCard.userCard;
import static com.bank.card.entity.QCard.card;
import static com.bank.performance.entity.QPerformance.performance;
import static com.bank.user.entity.QUser.user;
import static com.bank.account.entity.QAccount.account;


@RequiredArgsConstructor
public class UserCardRepositoryImpl implements UserCardRepositoryCustom {

    private final JPAQueryFactory jpaQueryFactory;

    @Override
    public List<UserCard> findUserCardByUUID(Integer uuid) {
        return jpaQueryFactory
                .selectFrom(userCard)
                .where(userCard.account.user.uuid.eq(uuid)).fetch();

//        .join(userCard.account, account).fetchJoin()
//                .join(account.user, user).fetchJoin()
    }

    //추후 리팩토링
    //가독성 너무 개판임
    //이게..최선인가..?
    @Override
    public Optional<PerformanceResponseDto> findUserCardPerformance(Integer cardUuid) {
//        BooleanExpression isPerformance = new CaseBuilder()
//                .when(userCard.userPerformance.goe(userCard.card.performance))
//                .then(true)
//                .otherwise(false);
//
//
//        return Optional.ofNullable(jpaQueryFactory
//                .select(Projections.bean(PerformanceResponseDto.class,
//                                userCard.id.as("cardUuid"),
//                                userCard.card.performance,
//                                userCard.userPerformance,
//                                isPerformance.as("isPerformance"),
//                                userCard.isPerformanced.as("isPerformancePre")))
//                .from(userCard)
//                .leftJoin(userCard).fetchJoin()
//                .where(userCard.id.eq(cardUuid))
//                .fetchOne());
        return null;
    }

    @Override
    public CardFindDto findCardType(Integer cardUuid) {
        return jpaQueryFactory.select(Projections.fields(CardFindDto.class,
                        userCard.id.as("cardUuid"),
                        card.id.as("cardId"),
                        card.type.as("cardType"),
                        card.cardName.as("cardName"),
                        account.balance.as("balance")))
                .from(userCard)
                .join(card).on(card.id.eq(userCard.card.id))
                .join(account).on(account.id.eq(userCard.account.id))
                .where(userCard.id.eq(cardUuid))
                .fetchOne();
    }

    @Override
    public List<UserCardDto> findUserCardListByUuid(Integer uuid) {
        return jpaQueryFactory
                .select(Projections.fields(UserCardDto.class,
                        userCard.id.as("userCardId"),
                        userCard.serialNumber,
                        card.type.as("cardType"),
                        card.cardName,
                        userCard.validDate,
                        card.visa, card.master,
                        card.cardDefaultImage.as("cardDefaulImage")))
                .from(userCard)
                .join(userCard.account)
                .join(account.user)
                .where(user.uuid.eq(uuid))
                .fetch();
    }

    @Override
    public UserCardDto findUSerCardBySerialNumber(String serialNumber, String cvc, String password) {
        return jpaQueryFactory
                .select(Projections.fields(UserCardDto.class,
                        userCard.id.as("userCardId"),
                        userCard.serialNumber,
                        card.type.as("cardType"),
                        card.cardName,
                        userCard.validDate,
                        card.visa, card.master,
                        card.cardDefaultImage.as("cardDefaulImage")))
                .from(userCard)
                .join(card).on(card.id.eq(userCard.card.id))
                .where(userCard.serialNumber.eq(serialNumber),
                        userCard.cvc.eq(cvc),
                        userCard.password.like(password + '%'))
                .fetchOne();
    }
}
