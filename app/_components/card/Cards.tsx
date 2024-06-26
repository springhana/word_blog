'use client';

import { useCards } from '@/hook/useCards';
import { useAppSelector } from '@/redux/hook';
import { CardsType } from '@/types/global';

import { SkeletonCard } from '../loading/skeleton/SkeletonCard';
import CardsItem from './CardsItem';

export default function Cards({ tag }: { tag: string }) {
  const pages = useAppSelector(state => state.pageReducer.page);

  const { loading, error, cards } = useCards(pages, tag, 'tag') as {
    loading: boolean;
    error: boolean;
    cards: CardsType;
  };

  if (loading) {
    return Array.from({ length: 8 }).map((_, index) => (
      <SkeletonCard key={index} />
    ));
  }

  return (
    <div>
      {cards.result ? (
        <div>
          <CardsItem
            cards={cards}
            page={pages}
            loading={loading}
            error={error}
            tag={tag}
          />
        </div>
      ) : (
        <div className="search_result">카드가 없습니다.</div>
      )}
    </div>
  );
}
