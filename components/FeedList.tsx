import FeedItem from '@/components/FeedItem';
import { colors } from '@/constants';
import useGetInfinitePosts from '@/hooks/queries/useGetInfinitePosts';
import { useScrollToTop } from '@react-navigation/native';
import React, { useRef, useState } from 'react';
import { FlatList, StyleSheet } from 'react-native';

interface FeedListProps {}

function FeedList({}: FeedListProps) {
  const {
    data: posts,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = useGetInfinitePosts();

  const ref = useRef<FlatList | null>(null);
  const [isRefreshing, setIsrefreshing] = useState(false);
  useScrollToTop(ref);

  const handleEndReached = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  const handleRefresh = async () => {
    setIsrefreshing(true);
    await refetch();
    setIsrefreshing(false);
  };
  return (
    <FlatList
      ref={ref}
      data={posts?.pages.flat()}
      renderItem={({ item }) => <FeedItem post={item} />}
      keyExtractor={(item) => String(item.id)}
      contentContainerStyle={styles.contentContainer}
      onEndReached={handleEndReached}
      onEndReachedThreshold={0.5}
      refreshing={isRefreshing}
      onRefresh={handleRefresh}
    />
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    paddingVertical: 12,
    backgroundColor: colors.GRAY_200,
    gap: 12,
  },
});

export default FeedList;
