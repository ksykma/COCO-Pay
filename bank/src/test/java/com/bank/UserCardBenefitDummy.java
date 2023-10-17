package com.bank;

import com.bank.benefit.entity.Benefit;
import com.bank.benefit.entity.UserCardBenefit;
import com.bank.benefit.repository.BenefitRepository;
import com.bank.benefit.repository.UserCardBenefitRepository;
import com.bank.card.entity.UserCard;
import com.bank.card.repository.card.CardRepository;
import com.bank.card.repository.usercard.UserCardRepository;
import com.querydsl.jpa.impl.JPAQueryFactory;
import jakarta.persistence.EntityManager;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

import static com.bank.benefit.entity.QBenefit.benefit;
import static com.bank.card.entity.QUserCard.userCard;

@SpringBootTest
public class UserCardBenefitDummy {

    JPAQueryFactory jpaQueryFactory;

    @Autowired
    EntityManager entityManager;

    @Autowired
    BenefitRepository benefitRepository;

    @Autowired
    UserCardRepository userCardRepository;

    @Autowired
    CardRepository cardRepository;

    @Autowired
    UserCardBenefitRepository userCardBenefitRepository;

    @BeforeEach
    public void init() {
        jpaQueryFactory = new JPAQueryFactory(entityManager);
    }

    @Test
    public void test() {

    }

    //사용자 혜택 넣기
    @Test
    public void saveUserCardBenefit() {
        int cardId = 3;
        List<UserCard> userCard = findUserCard(cardId);
        Benefit benefit = findCardIdByStoreName(cardId);

        for (UserCard card : userCard) {
            UserCardBenefit userCardBenefit = new UserCardBenefit();
            userCardBenefit.setBenefit(benefit);
            userCardBenefit.setUserCard(card);
            userCardBenefit.setDiscountAmount(benefit.getLimit());

            userCardBenefitRepository.save(userCardBenefit);
        }
    }


    //혜택 찾기
    @Test
    public Benefit findCardIdByStoreName(int cardId) {
        String storeName = "삼성온라인스토어";
        //삼성 온라인 스토어 달고 있는 카드 id
        return jpaQueryFactory
                .select(benefit)
                .from(benefit)
                .where(benefit.storeName.eq(storeName),
                        benefit.card.id.eq(cardId))
                .fetchOne();

        //6 5 7 3
//        System.out.println(res);
    }

    //유저 카드 찾기
    @Test
    public List<UserCard> findUserCard(int cardId) {
        return jpaQueryFactory
                .select(userCard)
                .from(userCard)
                .where(userCard.card.id.eq(cardId))
                .fetch();

    }

}
