import { Button, StyleSheet, Text, View } from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import {useState} from 'react'
import * as ImagePicker from 'expo-image-picker';

const staticImage = require("./assets/EPN.png");

cameraLaunch = () => {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.launchCamera(options, (res) => {
      console.log('Response = ', res);
      if (res.didCancel) {
        console.log('User cancelled image picker');
      } else if (res.error) {
        console.log('ImagePicker Error: ', res.error);
      } else if (res.customButton) {
        console.log('User tapped custom button: ', res.customButton);
        alert(res.customButton);
      } else {
        const source = { uri: res.uri };
        console.log('response', JSON.stringify(res));
        this.setState({
          filePath: res,
          fileData: res.data,
          fileUri: res.uri
        });
      }
    });
}


export default function App() {

  const [resourcePath, setResourcePath] = useState('')
  const [status, requestPermission] = ImagePicker.useCameraPermissions();

  const [type, setType] = useState(CameraType.back);
  const [cameraOn, setCamera] = useState(false);
  const [permissionCamera, requestPermissionCamera] = Camera.useCameraPermissions();


  function toggleCameraType() {

    setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
  }

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      console.log(result, result.assets[0].uri);
      setResourcePath(result.assets[0].uri);
      console.log({resourcePath});
    } else {
      alert('You did not select any image.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={{ justifyContent:'center' }}>
        {/* <Image uri={'https://epnconsulting.eu/wp-content/uploads/2023/07/EPN_4-02-1536x371.png'} /> */}
        <Text>Waste Classification Application</Text>
      </View>
      {
        resourcePath.length > 0 && 
          console.log(resourcePath)
      }

      <View>
        <Text>Please select what you want to do:</Text>
      <View style={styles.space} />
      <Button style={styles.button} title='Use Camera'></Button>
      {
        cameraOn && (
          <Camera style={styles.camera} type={type}>
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.button} onPress={toggleCameraType}>
                <Text style={styles.text}>Flip Camera</Text>
              </TouchableOpacity>
            </View>
          </Camera>
        )
      }
      <View style={styles.space} />
      <Button title='Select from Gallery' onPress={pickImageAsync}></Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-around',
    border: 'solid 1px black'
  },
  button: {
    width: '100%',
    marginVertical: 8,
    padding: 10,
  },
  space: {
    width: 10, // or whatever size you need
    height: 10,
  },
});
