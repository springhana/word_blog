'use client';
import dynamic from 'next/dynamic';

import { useTag } from '@/hook/useTag';
import { useAppSelector } from '@/redux/hook';
import { TagType } from '@/types/word_blog';

const Cards = dynamic(() => import('./Cards').then(mod => mod.default), {
  ssr: false,
});

export default function ViewCard() {
  const tag = useAppSelector(state => state.tagReducer.tag);
  const id = useAppSelector(state => state.idReducer.id);

  const { loading, error, tags, hasMore } = useTag(id, 'all') as {
    loading: boolean;
    error: boolean;
    tags: TagType[];
    hasMore: boolean;
  };

  return (
    <div>
      {tag.id === 'all' ? (
        <div>
          <Cards tag="all" />
        </div>
      ) : (
        <div>
          {!loading ? '로딩중' : null}
          {error ? '에러' : null}

          {hasMore &&
            tags.map(item => {
              return tag.id === item._id ? <Cards tag={tag.id} /> : null;
            })}
        </div>
      )}
    </div>
  );
}