import FeedItem from '@/components/FeedItem';
import { colors } from '@/constants';
import useGetInfiniteUserPosts from '@/hooks/queries/useGetInfiniteUserPosts';
import { useScrollToTop } from '@react-navigation/native';
import React, { useRef, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

interface UserFeedListProps {
  userId: number;
}

function UserFeedList({ userId }: UserFeedListProps) {
  const {
    data: posts,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = useGetInfiniteUserPosts(userId);

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
      ListEmptyComponent={
        <View style={styles.emptyContainer}>
          <Text>작성한 글이 없습니다.</Text>
        </View>
      }
    />
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    paddingVertical: 12,
    backgroundColor: colors.GRAY_200,
    gap: 12,
  },
  emptyContainer: {
    backgroundColor: colors.WHITE,
    padding: 16,
    alignItems: 'center',
  },
});

export default UserFeedList;
