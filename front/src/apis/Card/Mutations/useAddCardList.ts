import { useMutation } from '@tanstack/react-query';
import { postCard, postCardPurchased, postPayOnline, postPayOnlineComplete } from '../cardAPI';
import { CardInfo, PostCardPurchasedPayload, PayOnline, PayOnlineComplete } from '@/types/card';

const usePostCard = () => {
    return useMutation((cardInfo: CardInfo) => postCard(cardInfo), {
        onSuccess: (data) => {
            return data
        },
        onError: () => {
            console.log('작성 실패');
        },
    });
}

const usePostCardPurchased = () => {
    return useMutation((cardPurchased: PostCardPurchasedPayload) => postCardPurchased(cardPurchased), {
        onSuccess: (data) => {
            console.log("작성 완료");
            return data
        },
        onError: () => {
            console.log('작성 실패');
        },
    });
}

const usePostPayOnline = () => {
    return useMutation((payOnline: PayOnline) => postPayOnline(payOnline), {
        onSuccess: (data) => {
            return data
        },
        onError: () => {
            console.log('작성 실패');
        },
    });
}

const usePostPayOnlineComplete = () => {
    return useMutation((PayOnlineComplete: PayOnlineComplete) => postPayOnlineComplete(PayOnlineComplete), {
        onSuccess: () => {
            console.log('온라인 결제 성공')
        },
        onError: () => {
            console.log('온라인 결제 실패');
        },
    });
}


export { usePostCard, usePostCardPurchased, usePostPayOnline, usePostPayOnlineComplete };