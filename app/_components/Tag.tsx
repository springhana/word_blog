'use client';

import { HiHashtag } from '@react-icons/all-files/hi/HiHashtag';
import { IoClose } from '@react-icons/all-files/io5/IoClose';
import { IoPricetagOutline } from '@react-icons/all-files/io5/IoPricetagOutline';
import { IoPricetagSharp } from '@react-icons/all-files/io5/IoPricetagSharp';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

import { useTag } from '@/hook/useTag';
import { tag_change } from '@/redux/features/tagSlice';
import { onOpen } from '@/redux/features/writeSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import styles from '@/styles/Sidebar.module.css';

export default function Tag() {
  const dispatch = useAppDispatch();
  const pathname = usePathname();
  const tagRef = useRef<HTMLDivElement>(null);
  const tagBtnRef = useRef<HTMLDivElement>(null);

  const tag = useAppSelector(state => state.tagReducer.tag);
  const id = useAppSelector(state => state.idReducer.id);
  const { loading, error, tags, hasMore } = useTag(id, 'all');
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [toggle, setToggle] = useState(0);
  useEffect(() => {
    dispatch(tag_change({ id: 'all', name: 'all' }));

    function handleResize() {
      setWindowWidth(window.innerWidth);
      if (tagRef.current && tagBtnRef.current && window.innerWidth > 1024) {
        tagRef.current.style.removeProperty('right');
        tagBtnRef.current.style.removeProperty('left');
        tagBtnRef.current.style.removeProperty('backgroundColor');
        setToggle(0);
      }
    }

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const TagSlide = () => {
    if (
      tagRef.current &&
      tagBtnRef.current &&
      toggle === 0 &&
      windowWidth <= 1024
    ) {
      tagRef.current.style.right = '0';
      tagBtnRef.current.style.left = '0';
      tagBtnRef.current.style.backgroundColor = '#ffd645';
      setToggle(1);
    } else if (
      tagRef.current &&
      tagBtnRef.current &&
      toggle === 1 &&
      windowWidth <= 1024
    ) {
      tagRef.current.style.right = '-30%';
      tagBtnRef.current.style.left = '-50px';
      tagBtnRef.current.style.backgroundColor = '#fb6072';
      setToggle(0);
    }
  };

  return (
    <div className={styles.tag}>
      <div className={styles.tag_inner} ref={tagRef}>
        {loading ? id && '로딩중' : null}
        {error ? id && '에러' : null}

        {windowWidth <= 1024 ? (
          <div onClick={TagSlide} className={styles.tagBtn} ref={tagBtnRef}>
            {toggle === 0 ? (
              <>
                <HiHashtag size={25} />
              </>
            ) : (
              <IoClose size={25} />
            )}
          </div>
        ) : null}

        <div
          onClick={() => {
            dispatch(tag_change({ id: '태그 추가', name: '태그 추가' }));
            dispatch(onOpen());
          }}
          className={`${styles.hash_tag} ${styles.hash_add} ${
            tag.id === '태그 추가' ? styles.hash_active : ''
          }`}
        >
          {tag.id === '태그 추가' ? (
            <>
              <IoPricetagSharp />
              <span>태그 추가</span>
            </>
          ) : (
            <>
              <IoPricetagOutline />
              <span>태그 추가</span>
            </>
          )}
        </div>

        {pathname?.split('/')[1] === 'add' ? null : (
          <div
            onClick={() => {
              dispatch(tag_change({ id: 'all', name: 'all' }));
              TagSlide();
            }}
            className={`${styles.hash_tag} ${
              tag.id === 'all' ? styles.hash_active : ''
            }`}
          >
            <HiHashtag />
            <span>all</span>
          </div>
        )}
        {hasMore
          ? tags.map((item: { _id: string; name: string }, index: number) => (
              <div
                key={index}
                onClick={() => {
                  dispatch(tag_change({ id: item._id, name: item.name }));
                  TagSlide();
                }}
                className={`${styles.hash_tag} ${
                  tag.id === item._id ? styles.hash_active : ''
                }`}
              >
                <HiHashtag />
                <span>{item.name}</span>
              </div>
            ))
          : null}
      </div>
    </div>
  );
}
