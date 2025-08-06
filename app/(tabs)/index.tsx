import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Animated, StatusBar } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

export default function HomeScreen() {
  const [greeting, setGreeting] = useState('');
  const [animatedValue] = useState(new Animated.Value(0));
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('좋은 아침입니다! 🌅');
    else if (hour < 18) setGreeting('좋은 오후입니다! ☀️');
    else setGreeting('좋은 저녁입니다! 🌙');

    // 애니메이션 시작
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    // 시계 업데이트
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const features = [
    { id: 1, icon: 'rocket-outline', title: '빠른 시작', desc: '간편하게 프로젝트를 시작하세요', color: '#FF6B6B' },
    { id: 2, icon: 'code-slash-outline', title: '개발 도구', desc: '강력한 개발 환경을 제공합니다', color: '#4ECDC4' },
    { id: 3, icon: 'phone-portrait-outline', title: '반응형', desc: '모든 디바이스에서 완벽하게', color: '#45B7D1' },
    { id: 4, icon: 'sparkles-outline', title: '최신 기술', desc: 'React Native + Expo 최신 기능', color: '#96CEB4' },
  ];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* 그라디언트 헤더 */}
      <LinearGradient
        colors={['#667eea', '#764ba2']}
        style={styles.header}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Animated.View 
          style={[
            styles.headerContent,
            {
              opacity: animatedValue,
              transform: [{
                translateY: animatedValue.interpolate({
                  inputRange: [0, 1],
                  outputRange: [-20, 0],
                })
              }]
            }
          ]}
        >
          <Text style={styles.welcomeText}>{greeting}</Text>
          <Text style={styles.appTitle}>React Native App</Text>
          <Text style={styles.timeText}>
            {currentTime.toLocaleTimeString('ko-KR')}
          </Text>
        </Animated.View>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* 기능 카드들 */}
        <View style={styles.featuresContainer}>
          <Text style={styles.sectionTitle}>주요 기능</Text>
          <View style={styles.cardsGrid}>
            {features.map((feature, index) => (
              <Animated.View
                key={feature.id}
                style={[
                  styles.featureCard,
                  {
                    opacity: animatedValue,
                    transform: [{
                      translateX: animatedValue.interpolate({
                        inputRange: [0, 1],
                        outputRange: [index % 2 === 0 ? -50 : 50, 0],
                      })
                    }]
                  }
                ]}
              >
                <TouchableOpacity 
                  style={[styles.cardContent, { borderLeftColor: feature.color }]}
                  onPress={() => console.log(`${feature.title} 클릭됨`)}
                >
                  <View style={[styles.iconContainer, { backgroundColor: feature.color + '20' }]}>
                    <Ionicons name={feature.icon as any} size={24} color={feature.color} />
                  </View>
                  <Text style={styles.cardTitle}>{feature.title}</Text>
                  <Text style={styles.cardDesc}>{feature.desc}</Text>
                </TouchableOpacity>
              </Animated.View>
            ))}
          </View>
        </View>

        {/* 액션 버튼들 */}
        <View style={styles.actionsContainer}>
          <Text style={styles.sectionTitle}>빠른 액션</Text>
          
          <TouchableOpacity style={[styles.actionButton, styles.primaryButton]}>
            <Ionicons name="play-circle-outline" size={20} color="white" />
            <Text style={styles.primaryButtonText}>프로젝트 시작하기</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.actionButton, styles.secondaryButton]}>
            <Ionicons name="document-text-outline" size={20} color="#667eea" />
            <Text style={styles.secondaryButtonText}>문서 보기</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.actionButton, styles.secondaryButton]}>
            <Ionicons name="settings-outline" size={20} color="#667eea" />
            <Text style={styles.secondaryButtonText}>설정</Text>
          </TouchableOpacity>
        </View>

        {/* 푸터 */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            💡 Tip: 개발자 도구를 열려면 디바이스를 흔들어보세요!
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 50,
  },
  headerContent: {
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 18,
    color: 'white',
    marginBottom: 8,
    fontWeight: '500',
  },
  appTitle: {
    fontSize: 32,
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 8,
  },
  timeText: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    fontWeight: '300',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  featuresContainer: {
    marginTop: 30,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  cardsGrid: {
    gap: 15,
  },
  featureCard: {
    marginBottom: 15,
  },
  cardContent: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  cardDesc: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  actionsContainer: {
    marginTop: 40,
    marginBottom: 30,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 15,
    gap: 10,
  },
  primaryButton: {
    backgroundColor: '#667eea',
    shadowColor: '#667eea',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  secondaryButton: {
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: '#667eea',
  },
  primaryButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  secondaryButtonText: {
    color: '#667eea',
    fontSize: 16,
    fontWeight: '600',
  },
  footer: {
    padding: 20,
    alignItems: 'center',
    marginBottom: 30,
  },
  footerText: {
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
    fontStyle: 'italic',
  },
});
