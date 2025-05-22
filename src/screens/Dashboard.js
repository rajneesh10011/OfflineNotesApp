import {
  Animated,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  LayoutAnimation,
  FlatList,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import colors from '../constant/colors';
import {Header, ScreenContainer, Spacer} from '../components';
import NotesItem from '../components/NotesItem';
import {icons} from '../assets';
import {clearNotes, deleteNoteData, getNotes} from '../slices/notesSlice';

const Dashboard = ({navigation}) => {
  const dispatch = useDispatch();

  const {notes, total} = useSelector(state => state.notesSlice);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchInitialNotes();
  }, []);

  const fetchInitialNotes = () => {
    dispatch(
      getNotes({
        limit: 5,
        page: 0,
        onRequest: () => setLoading(true),
        onSuccess: () => setLoading(false),
        onFail: err => {
          setLoading(false);
          setError(err);
        },
      }),
    );
  };

  const loadMorePosts = useCallback(() => {
    if (!loading && !loadingMore && notes.length < total) {
      dispatch(
        getNotes({
          limit: 5,
          onRequest: () => setLoadingMore(true),
          onSuccess: () => setLoadingMore(false),
          onFail: err => {
            setLoadingMore(false);
            setError(err);
          },
        }),
      );
    }
  }, [loading, loadingMore, notes.length, total]);

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    dispatch(clearNotes());
    dispatch(
      getNotes({
        limit: 5,
        page: 0,
        onRequest: () => {},
        onSuccess: () => setRefreshing(false),
        onFail: err => {
          setRefreshing(false);
          setError(err);
        },
      }),
    );
  }, []);

  const onPressAddNotes = () => {
    // Navigate to Add Notes screen
    navigation.navigate('AddEditNote', {
      isEditScreen: false,
      headerText: 'Add Note',
      buttonText: 'Add',
      noteId: null,
      noteTitle: null,
      noteDescription: null,
    });
  };

  const handleDeleteNotes = id => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    dispatch(
      deleteNoteData({
        id,
        onRequest: () => {},
        onSuccess: () => setRefreshing(false),
        onFail: err => {
          setRefreshing(false);
          setError(err);
        },
      }),
    );
  };

  // const handleDeleteNotes = id => {
  //   // LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  //   dispatch(
  //     deleteNoteData({
  //       id,
  //       onRequest: () => {},
  //       onSuccess: () => {
  //         // Only reset refreshing if it was triggered manually
  //         if (refreshing) setRefreshing(false);

  //         // Delay state transition to avoid blinking when last note is deleted
  //         setTimeout(() => {
  //           if (notes.length === 1) {
  //             // this was the last note, safe to re-fetch to stabilize UI
  //             fetchInitialNotes();
  //           }
  //         }, 300);
  //       },
  //       onFail: err => {
  //         setRefreshing(false);
  //         setError(err);
  //       },
  //     }),
  //   );
  // };

  const handleNotesEdit = item => {
    // Navigate to Edit Notes screen
    navigation.navigate('AddEditNote', {
      isEditScreen: true,
      headerText: 'Edit Note',
      buttonText: 'Save',
      noteId: item.id,
      noteTitle: item.title,
      noteDescription: item.body,
    });
  };

  const renderItem = useCallback(
    ({item}) => {
      const {id, title, body} = item;
      return (
        <NotesItem
          id={id}
          title={title}
          description={body}
          onPressDelete={() => handleDeleteNotes(id)}
          onPressEdit={() => handleNotesEdit(item)}
        />
      );
    },
    [notes],
  );

  const renderListFooter = useCallback(() => {
    if (loadingMore) {
      return (
        <View style={styles.footer}>
          <ActivityIndicator size="small" color={colors.loader} />
        </View>
      );
    }
    return null;
  }, [loadingMore]);

  const renderListEmpty = useCallback(() => {
    return (
      <View style={styles.emptyContainer}>
        <TouchableOpacity style={styles.addBigButton} onPress={onPressAddNotes}>
          <Image source={icons.addIcon} style={{height: 50, width: 50}} />
          <Spacer height={5} />
          <Text style={styles.addNotesText}>Add Notes</Text>
          <Spacer height={10} />
        </TouchableOpacity>
        <Text style={styles.addButtonDesc}>
          Click on the button to create a notes
        </Text>
      </View>
    );
  }, [notes]);

  const renderAddButton = useCallback(() => {
    if (!notes.length) {
      return null;
    }
    return (
      <TouchableOpacity style={styles.addButton} onPress={onPressAddNotes}>
        <Image source={icons.addIcon} style={{height: 20, width: 20}} />
        <Text style={styles.addNotes}>{`Add `}</Text>
      </TouchableOpacity>
    );
  }, [notes]);

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color={colors.loader} />
      </View>
    );
  }

  if (error && notes.length === 0) {
    return (
      <View style={styles.loader}>
        <Text style={styles.error}>Unable to fetch notes</Text>
        <Spacer height={10} />
        <TouchableOpacity onPress={fetchInitialNotes}>
          <Text style={styles.retry}>Try Again</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScreenContainer>
      <Header title={'📝 Notes'} leftIcon={false} />
      <Spacer height={16} />
      <View style={styles.topContainer}>
        <Text style={styles.postListTitle}>Notes</Text>
        {renderAddButton()}
      </View>
      <Spacer height={10} />
      <FlatList
        style={{flex: 1}}
        data={notes}
        renderItem={renderItem}
        keyExtractor={item => item?.id?.toString()}
        extraData={notes}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        onEndReached={loadMorePosts}
        onEndReachedThreshold={0.7}
        refreshing={refreshing}
        onRefresh={handleRefresh}
        ListFooterComponent={renderListFooter}
        ListEmptyComponent={renderListEmpty}
        scrollEventThrottle={16}
        removeClippedSubviews
        initialNumToRender={8}
        maxToRenderPerBatch={8}
        windowSize={7}
        updateCellsBatchingPeriod={30}
      />
    </ScreenContainer>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    width: '100%',
  },
  postListTitle: {
    fontSize: 18,
    color: colors.black,
    fontWeight: '600',
  },
  listContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingBottom: 20,
    paddingVertical: 10,
  },
  loader: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  error: {
    fontSize: 16,
    color: colors.secondaryText,
  },
  retry: {
    color: colors.blue,
    fontSize: 14,
  },
  footer: {
    alignItems: 'center',
    marginVertical: 16,
  },
  footerText: {
    color: colors.secondaryText,
    fontSize: 14,
  },
  topContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  addNotes: {
    fontSize: 14,
    color: colors.black,
    paddingLeft: 5,
    fontWeight: '500',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary + 70,
    padding: 7,
    borderRadius: 26,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.12,
    shadowRadius: 1.22,
    elevation: 3,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addNotesText: {
    fontSize: 16,
    color: colors.primaryText,
    fontWeight: '600',
  },
  addButtonDesc: {
    fontSize: 14,
    color: colors.secondaryText,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  addBigButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
  },
});
