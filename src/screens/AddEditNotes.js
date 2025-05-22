import {Alert, StyleSheet, View} from 'react-native';
import React, {useCallback, useEffect} from 'react';
import {Header, Input, RNButton, ScreenContainer, Spacer} from '../components';
import colors from '../constant/colors';
import {useDispatch} from 'react-redux';
import {createNote, editNote} from '../slices/notesSlice';

const AddEditNotes = ({navigation, route}) => {
  const {
    headerText,
    buttonText,
    noteId,
    noteTitle,
    noteDescription,
    isEditScreen,
  } = route.params;
  const dispatch = useDispatch();

  const [title, setTitle] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [titleValidation, setTitleValidation] = React.useState('');
  const [descriptionValidation, setDescriptionValidation] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  useEffect(() => {
    if (noteTitle?.length) {
      setTitle(noteTitle);
    }
    if (noteDescription?.length) {
      setDescription(noteDescription);
    }
  }, [noteTitle, noteDescription]);

  const onChangeTitle = text => {
    setTitle(text);
    if (text.length) {
      setTitleValidation('');
    }
  };
  const onChangeDescription = text => {
    setDescription(text);
    if (text.length) {
      setDescriptionValidation('');
    }
  };

  const handlePressEditSave = useCallback(() => {
    // Add your logic to handle edit a note
    if (!title.length) {
      setTitleValidation('Please enter the title');
    } else if (!description.length) {
      setDescriptionValidation('Please enter the description');
    } else {
      setLoading(true);

      dispatch(
        editNote({
          id: noteId,
          title,
          body: description,
          onRequest: () => setLoading(true),
          onSuccess: () => {
            setLoading(false);
            setTitle(null);
            setDescription(null);
            navigation.goBack();
          },
          onFail: err => {
            setLoading(false);
          },
        }),
      );
    }
  }, [noteId, title, description]);

  const handlePressAdd = useCallback(() => {
    // Add your logic to handle adding a note
    if (!title.length) {
      setTitleValidation('Please enter the title');
    } else if (!description.length) {
      setDescriptionValidation('Please enter the description');
    } else {
      setLoading(true);
      dispatch(
        createNote({
          title,
          body: description,
          onRequest: () => setLoading(true),
          onSuccess: () => {
            setLoading(false);
            setTitle(null);
            setDescription(null);
            navigation.goBack();
          },
          onFail: err => {
            setLoading(false);
          },
        }),
      );
    }
  }, [title, description]);

  const onPressButton = useCallback(() => {
    isEditScreen === true ? handlePressEditSave() : handlePressAdd();
  }, [isEditScreen, handlePressEditSave, handlePressAdd]);

  const handlePressBack = () => {
    navigation.goBack();
  };
  return (
    <ScreenContainer>
      <Header title={headerText} onPressBack={handlePressBack} />
      <Spacer height={10} />
      <View style={{padding: 16}}>
        <Input
          label={'Title'}
          placeholder="Enter title"
          value={title}
          onChangeText={onChangeTitle}
          error={titleValidation}
        />
        <Input
          label={'Description'}
          placeholder="Enter description"
          value={description}
          onChangeText={onChangeDescription}
          multiline
          inputStyle={{height: 140}}
          error={descriptionValidation}
        />
      </View>
      <RNButton text={buttonText} onPress={onPressButton} loading={loading} />
    </ScreenContainer>
  );
};

export default AddEditNotes;

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  button: {
    backgroundColor: colors.primary,
    padding: 14,
    borderRadius: 10,
    marginHorizontal: 16,
  },
  buttonText: {
    color: colors.primaryText,
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '600',
  },
});
