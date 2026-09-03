import React, { useState } from 'react';
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';

type Message = { id: string; role: 'user' | 'ai'; text: string };

export default function Home() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', role: 'ai', text: 'Halo 👋 Aku NOVA. Ada yang ingin kamu bicarakan?' }
  ]);

  function send() {
    const text = input.trim();
    if (!text) return;
    const user = { id: Date.now().toString(), role: 'user' as const, text };
    const ai = {
      id: (Date.now() + 1).toString(),
      role: 'ai' as const,
      text: `Aku menerima pesanmu: “${text}”\n\nIni masih NOVA AI V1. Nanti kita sambungkan ke AI sungguhan melalui backend yang aman.`
    };
    setMessages(prev => [...prev, user, ai]);
    setInput('');
  }

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>NOVA AI</Text>
            <Text style={styles.subtitle}>Your private AI companion</Text>
          </View>
          <View style={styles.badge}><Text style={styles.badgeText}>18+</Text></View>
        </View>

        <FlatList
          data={messages}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <View style={[styles.bubble, item.role === 'user' ? styles.userBubble : styles.aiBubble]}>
              <Text style={styles.role}>{item.role === 'user' ? 'Kamu' : 'NOVA'}</Text>
              <Text style={styles.message}>{item.text}</Text>
            </View>
          )}
        />

        <View style={styles.composer}>
          <TextInput
            value={input}
            onChangeText={setInput}
            placeholder="Tulis pesan..."
            placeholderTextColor="#777"
            style={styles.input}
            multiline
          />
          <TouchableOpacity style={styles.send} onPress={send}>
            <Text style={styles.sendText}>➤</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe:{flex:1,backgroundColor:'#09090d'},
  container:{flex:1},
  header:{paddingHorizontal:20,paddingTop:18,paddingBottom:14,flexDirection:'row',justifyContent:'space-between',alignItems:'center',borderBottomWidth:1,borderBottomColor:'#202027'},
  title:{fontSize:25,fontWeight:'800',color:'#fff'},
  subtitle:{fontSize:12,color:'#999',marginTop:3},
  badge:{borderWidth:1,borderColor:'#555',borderRadius:14,paddingHorizontal:10,paddingVertical:5},
  badgeText:{color:'#ddd',fontWeight:'700'},
  list:{padding:16,paddingBottom:20},
  bubble:{maxWidth:'88%',padding:13,borderRadius:16,marginBottom:12},
  aiBubble:{alignSelf:'flex-start',backgroundColor:'#17171f',borderBottomLeftRadius:5},
  userBubble:{alignSelf:'flex-end',backgroundColor:'#30303a',borderBottomRightRadius:5},
  role:{fontSize:11,color:'#999',marginBottom:5,fontWeight:'700'},
  message:{fontSize:15,color:'#f4f4f4',lineHeight:21},
  composer:{margin:12,padding:7,backgroundColor:'#15151c',borderWidth:1,borderColor:'#2b2b35',borderRadius:20,flexDirection:'row',alignItems:'flex-end'},
  input:{flex:1,color:'#fff',fontSize:15,maxHeight:110,paddingHorizontal:12,paddingVertical:9},
  send:{width:42,height:42,borderRadius:21,backgroundColor:'#fff',alignItems:'center',justifyContent:'center'},
  sendText:{color:'#000',fontSize:20,fontWeight:'800'}
});
