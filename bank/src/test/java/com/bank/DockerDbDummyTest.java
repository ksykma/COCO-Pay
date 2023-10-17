package com.bank;

import com.bank.account.entity.Account;
import com.bank.account.repository.AccountRepository;
import com.bank.bank.entity.Bank;
import com.bank.bank.repository.BankRepository;
import com.bank.benefit.entity.Benefit;
import com.bank.benefit.entity.UserCardBenefit;
import com.bank.benefit.repository.BenefitRepository;
import com.bank.benefit.repository.UserCardBenefitRepository;
import com.bank.card.entity.Card;
import com.bank.card.entity.UserCard;
import com.bank.card.repository.card.CardRepository;
import com.bank.card.repository.usercard.UserCardRepository;
import com.bank.card_history.entity.Category;
import com.bank.card_history.entity.DiscountType;
import com.bank.enumlist.BenefitList;
import com.bank.enumlist.CardList;
import com.bank.enumlist.PerformanceList;
import com.bank.performance.entity.Performance;
import com.bank.performance.repository.PerformanceRepository;
import com.bank.user.entity.User;
import com.bank.user.repository.UserRepository;
import com.github.javafaker.Faker;
import com.querydsl.jpa.impl.JPAQueryFactory;
import jakarta.persistence.EntityManager;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Locale;

import static com.bank.account.entity.QAccount.account;
import static com.bank.bank.entity.QBank.bank;
import static com.bank.benefit.entity.QBenefit.benefit;
import static com.bank.card.entity.QCard.card;

@SpringBootTest
public class DockerDbDummyTest {
    Faker faker = new Faker(new Locale("ko"));
    JPAQueryFactory jpaQueryFactory;

    CardList enumCardList;

    PerformanceList enumPerformanceList;

    @Autowired
    EntityManager entityManager;

    @Autowired
    BankRepository bankRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    AccountRepository accountRepository;

    @Autowired
    CardRepository cardRepository;

    @Autowired
    PerformanceRepository performanceRepository;

    @Autowired
    BenefitRepository benefitRepository;

    @Autowired
    UserCardRepository userCardRepository;

    @Autowired
    UserCardBenefitRepository userCardBenefitRepository;

    @BeforeEach
    public void init() {
        jpaQueryFactory = new JPAQueryFactory(entityManager);
    }

    //사용방법
    //name, tel 변수 세팅 후 아래 메서드 하나만 진행
    //이후 2번메서드 userCardDummy()에 userId와 보라색 부분의 카드이름을 변경 후 실행
    @Test
    public void makeDummy() {
        String name = "한성현";
        String tel = "01051365349";
        userDummy(name, tel);
//        bankDummy();
//        cardDummy();
        accountDummy();
        performanceDummy();
        benefitDummy();
    }

    @Test
    public void userCardDummy() {
        //유저 찾기
        //변수 필요하면 바꾸면 댐
        int userId = 7;
        User findUser = userRepository.findById(userId).get();

        //만들고 싶은 카드 이름 가져오기
        //CardList.만들고싶은거 고르고
        //.getCardName 까지 진행하야함
        //보라색 부분만 수정하면 됨
        String cardName = CardList.현대패밀리.getCardName();
        String bankName = CardList.현대패밀리.getBankName();

        Card findCard = findCardByName(cardName);
        Bank findBank = findBankByBankName(bankName);

        Account findAccount = findAccount(findUser, findBank);

        UserCard build = UserCard.builder()
                .account(findAccount)
                .card(findCard)
                .password("0000")
                .serialNumber(faker.numerify("####-####-####-####"))
                .isPerformanced(true)
                .validDate("12/25")
                .cvc("000")
                .performanceLevel(0)
                .totalPrice(0)
                .build();
        UserCard save = userCardRepository.save(build);

        //사용자 별 혜택도 맹그러야 댐

        List<Benefit> benefitList = findBenefitList(findCard);

        List<UserCardBenefit> userCardBenefitList = benefitList.stream()
                .map(benefit -> {
                    UserCardBenefit userCardBenefit = new UserCardBenefit();
                    userCardBenefit.setUserCard(save);
                    userCardBenefit.setBenefit(benefit);
                    userCardBenefit.setDiscountAmount(benefit.getLimit());
                    return userCardBenefit;
                }).toList();

        userCardBenefitRepository.saveAll(userCardBenefitList);
    }

    @Test
    public void userDummy(String name, String tel) {

        User user = User.builder()
                .name(name)
                .tel(tel)
                .build();

        userRepository.save(user);
    }

    @Test
    public void userDummy2() {
        String name = "조환희";
        String tel = "01021278653";
        User user = User.builder()
                .name(name)
                .tel(tel)
                .build();

        userRepository.save(user);
    }

    @Test
    public void bankDummy() {

        List<String> nameList = new ArrayList<>();
        //여기에 넣고 싶은 금융권 이름
        nameList.add("농협");
        nameList.add("우리");
        nameList.add("신한");
        nameList.add("국민");
        nameList.add("카카오뱅크");
        nameList.add("토스");
        nameList.add("하나");
        nameList.add("케이뱅크");
        nameList.add("삼성");
        nameList.add("현대");
        nameList.add("롯데");
        nameList.add("기업");

        List<Bank> bankList = nameList.stream()
                .map(name -> {
                    Bank bank = new Bank();
                    bank.setBankName(name);

                    return bank;
                }).toList();

        bankRepository.saveAll(bankList);
    }

    @Test
    public void accountDummy() {
        User user = userRepository.findById(8).get();

        List<Bank> findBankList = bankRepository.findAll();

        List<Account> accountList = new ArrayList<>();

        for (Bank bank : findBankList) {
            Account account = Account.builder()
                    .num(faker.numerify("###-###-######"))
                    .balance(1000000)
                    .user(user)
                    .bank(bank)
                    .build();
            accountList.add(account);
        }

        accountRepository.saveAll(accountList);
    }

    @Test
    public void cardDummy() {
        CardList[] enumList = CardList.values();

        List<Card> newCardList = Arrays.stream(enumList)
                .map(enumCard -> {
                    Bank findBank = findBankByBankName(enumCard.getBankName());

                    Card card = new Card();
                    card.setBank(findBank);
                    card.setCardName(enumCard.getCardName());
                    card.setType(enumCard.getType());
                    card.setCardDefaultImage("url");
                    card.setVisa(true);
                    card.setMaster(true);

                    return card;
                }).toList();

        cardRepository.saveAll(newCardList);

    }

    @Test
    public void performanceDummy() {
        PerformanceList[] values = PerformanceList.values();
        System.out.println("리스트 : " + Arrays.toString(values));
        List<Performance> list = Arrays.stream(values)
                .map(v -> {
                    Card cardByName = findCardByName(v.getCardName());
                    return Performance.builder()
                            .level(v.getLevel())
                            .levelPrice(v.getLevelPrice())
                            .card(cardByName)
                            .build();
                })
                .toList();

        performanceRepository.saveAll(list);
    }

    @Test
    public void addBenefitOne() {
        //카드 이름
        String cardName = "노리2 (KB Pay)";
        String storeName = "삼성온라인스토어";
        //할인한도
        int limit = 1000000;
        //할인율
        int discount = 5;
        Card findCard = findCardByName(cardName);

        Benefit newBenefit = Benefit.builder()
                .card(findCard)
                .storeName(storeName)
                .category(Category.온라인쇼핑)
                .limit(limit)
                .discountType(DiscountType.페이백)
                .discount(discount)
                .build();

        benefitRepository.save(newBenefit);
    }

    @Test
    public void benefitDummy() {
        BenefitList[] values = BenefitList.values();
        List<Benefit> list = Arrays.stream(values)
                .map(b -> {
                    Card cardByName = findCardByName(b.getCardName());
                    return Benefit.builder()
                            .card(cardByName)
                            .category(b.getCategory())
                            .storeName(b.getStoreName())
                            .limit(b.getBenefitLimit())
                            .discountType(b.getDiscountType())
                            .discount(b.getDiscount())
                            .build();
                })
                .toList();

        benefitRepository.saveAll(list);
    }

    //유저 카드 생성 시 유저 혜택도 같이 생겨야함
    //유저 카드는 원클릭으로 다 만들기 힘들어서
    //하나씩 진행


    public List<Benefit> findBenefitList(Card card) {
        return jpaQueryFactory
                .selectFrom(benefit)
                .where(benefit.card.id.eq(card.getId()))
                .fetch();
    }

    public Account findAccount(User user, Bank bank) {
        return jpaQueryFactory
                .select(account)
                .from(account)
                .where(account.bank.eq(bank),
                        account.user.eq(user))
                .fetchOne();
    }


    public Bank findBankByBankName(String bankName) {
        return jpaQueryFactory
                .selectFrom(bank)
                .where(bank.bankName.eq(bankName))
                .fetchOne();
    }

    public Card findCardByName(String cardName) {
        return jpaQueryFactory
                .select(card)
                .from(card)
                .where(card.cardName.eq(cardName))
                .fetchOne();
    }
}
