import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useState } from 'react';
import { Animated, Dimensions, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const { width, height } = Dimensions.get('window');

export default function HomeScreen() {
  const [greeting, setGreeting] = useState('');
  const [animatedValue] = useState(new Animated.Value(0));
  const [currentTime, setCurrentTime] = useState(new Date());
  const [pressedCard, setPressedCard] = useState<number | null>(null);

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('좋은 아침입니다');
    else if (hour < 18) setGreeting('좋은 오후입니다');
    else setGreeting('좋은 저녁입니다');

    // 애니메이션 시작
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 1200,
      useNativeDriver: true,
    }).start();

    // 시계 업데이트
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const features = [
    { 
      id: 1, 
      icon: 'phone-portrait-outline', 
      title: '모바일 앱', 
      desc: 'React Native 기반\n크로스 플랫폼 개발',
      gradient: ['#667eea', '#764ba2']
    },
    { 
      id: 2, 
      icon: 'code-slash-outline', 
      title: '개발 환경', 
      desc: 'Expo SDK 53\n최신 개발 도구',
      gradient: ['#f093fb', '#f5576c']
    },
    { 
      id: 3, 
      icon: 'build-outline', 
      title: 'CI/CD', 
      desc: 'CircleCI 자동화\nAPK 빌드 파이프라인',
      gradient: ['#4facfe', '#00f2fe']
    },
    { 
      id: 4, 
      icon: 'cloud-outline', 
      title: 'EAS Build', 
      desc: 'Expo Application Services\n클라우드 빌드',
      gradient: ['#43e97b', '#38f9d7']
    },
  ];

  const quickActions = [
    { icon: 'play-circle-outline', label: '시작하기', color: '#667eea' },
    { icon: 'settings-outline', label: '설정', color: '#764ba2' },
    { icon: 'help-circle-outline', label: '도움말', color: '#f093fb' },
    { icon: 'information-circle-outline', label: '정보', color: '#4facfe' },
  ];

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('ko-KR', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long'
    });
  };

  const NeumorphicCard = ({ children, style, pressed = false }: any) => {
    return (
      <View style={[
        styles.neumorphicCard,
        pressed ? styles.neumorphicCardPressed : styles.neumorphicCardNormal,
        style
      ]}>
        {children}
      </View>
    );
  };

  const NeumorphicButton = ({ onPress, children, style }: any) => {
    const [isPressed, setIsPressed] = useState(false);
    
    return (
      <TouchableOpacity
        onPressIn={() => setIsPressed(true)}
        onPressOut={() => setIsPressed(false)}
        onPress={onPress}
        activeOpacity={1}
        style={style}
      >
        <NeumorphicCard pressed={isPressed}>
          {children}
        </NeumorphicCard>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f0f0f3" />
      
      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        bounces={true}
      >
        {/* 헤더 섹션 */}
        <Animated.View 
          style={[
            styles.headerSection,
            {
              opacity: animatedValue,
              transform: [{
                translateY: animatedValue.interpolate({
                  inputRange: [0, 1],
                  outputRange: [-50, 0]
                })
              }]
            }
          ]}
        >
          <NeumorphicCard style={styles.greetingCard}>
            <Text style={styles.greetingText}>{greeting}</Text>
            <Text style={styles.timeText}>{formatTime(currentTime)}</Text>
            <Text style={styles.dateText}>{formatDate(currentTime)}</Text>
          </NeumorphicCard>
        </Animated.View>

        {/* 상태 카드 */}
        <Animated.View 
          style={[
            styles.statusSection,
            {
              opacity: animatedValue,
              transform: [{
                translateY: animatedValue.interpolate({
                  inputRange: [0, 1],
                  outputRange: [50, 0]
                })
              }]
            }
          ]}
        >
          <NeumorphicCard style={styles.statusCard}>
            <View style={styles.statusRow}>
              <View style={styles.statusItem}>
                <View style={[styles.statusDot, { backgroundColor: '#43e97b' }]} />
                <Text style={styles.statusLabel}>서버 상태</Text>
                <Text style={styles.statusValue}>정상</Text>
              </View>
              <View style={styles.statusDivider} />
              <View style={styles.statusItem}>
                <View style={[styles.statusDot, { backgroundColor: '#4facfe' }]} />
                <Text style={styles.statusLabel}>빌드 상태</Text>
                <Text style={styles.statusValue}>진행중</Text>
              </View>
            </View>
          </NeumorphicCard>
        </Animated.View>

        {/* 기능 카드들 */}
        <View style={styles.featuresSection}>
          <Text style={styles.sectionTitle}>주요 기능</Text>
          <View style={styles.featuresGrid}>
            {features.map((feature, index) => (
              <Animated.View
                key={feature.id}
                style={[
                  styles.featureCardContainer,
                  {
                    opacity: animatedValue,
                    transform: [{
                      translateY: animatedValue.interpolate({
                        inputRange: [0, 1],
                        outputRange: [100 + (index * 20), 0]
                      })
                    }]
                  }
                ]}
              >
                <NeumorphicButton
                  onPress={() => {
                    setPressedCard(feature.id);
                    setTimeout(() => setPressedCard(null), 200);
                  }}
                  style={styles.featureCard}
                >
                  <LinearGradient
                    colors={[feature.gradient[0], feature.gradient[1]] as any}
                    style={styles.featureIconContainer}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                  >
                    <Ionicons 
                      name={feature.icon as any} 
                      size={28} 
                      color="white" 
                    />
                  </LinearGradient>
                  <Text style={styles.featureTitle}>{feature.title}</Text>
                  <Text style={styles.featureDesc}>{feature.desc}</Text>
                </NeumorphicButton>
              </Animated.View>
            ))}
          </View>
        </View>

        {/* 빠른 액션 */}
        <View style={styles.actionsSection}>
          <Text style={styles.sectionTitle}>빠른 액션</Text>
          <View style={styles.actionsGrid}>
            {quickActions.map((action, index) => (
              <Animated.View
                key={index}
                style={[
                  styles.actionItem,
                  {
                    opacity: animatedValue,
                    transform: [{
                      scale: animatedValue.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0.8, 1]
                      })
                    }]
                  }
                ]}
              >
                <NeumorphicButton style={styles.actionButton}>
                  <View style={[styles.actionIconContainer, { backgroundColor: action.color }]}>
                    <Ionicons 
                      name={action.icon as any} 
                      size={24} 
                      color="white" 
                    />
                  </View>
                  <Text style={styles.actionLabel}>{action.label}</Text>
                </NeumorphicButton>
              </Animated.View>
            ))}
          </View>
        </View>

        {/* 통계 섹션 */}
        <Animated.View 
          style={[
            styles.statsSection,
            {
              opacity: animatedValue,
              transform: [{
                translateY: animatedValue.interpolate({
                  inputRange: [0, 1],
                  outputRange: [100, 0]
                })
              }]
            }
          ]}
        >
          <NeumorphicCard style={styles.statsCard}>
            <Text style={styles.statsTitle}>프로젝트 통계</Text>
            <View style={styles.statsGrid}>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>12</Text>
                <Text style={styles.statLabel}>빌드 성공</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>3</Text>
                <Text style={styles.statLabel}>배포 완료</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>98%</Text>
                <Text style={styles.statLabel}>성공률</Text>
              </View>
            </View>
          </NeumorphicCard>
        </Animated.View>

        <View style={styles.bottomSpacing} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f3',
  },
  scrollView: {
    flex: 1,
  },
  
  // Neumorphism 기본 스타일
  neumorphicCard: {
    backgroundColor: '#f0f0f3',
    borderRadius: 20,
  },
  neumorphicCardNormal: {
    shadowColor: '#d1d9e6',
    shadowOffset: { width: 6, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  neumorphicCardPressed: {
    shadowColor: '#d1d9e6',
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 2,
  },

  // 헤더 섹션
  headerSection: {
    padding: 20,
    paddingTop: 60,
  },
  greetingCard: {
    padding: 30,
    alignItems: 'center',
  },
  greetingText: {
    fontSize: 24,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 8,
  },
  timeText: {
    fontSize: 36,
    fontWeight: '300',
    color: '#667eea',
    marginBottom: 4,
  },
  dateText: {
    fontSize: 16,
    color: '#7f8c8d',
    fontWeight: '400',
  },

  // 상태 섹션
  statusSection: {
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  statusCard: {
    padding: 20,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusItem: {
    flex: 1,
    alignItems: 'center',
  },
  statusDivider: {
    width: 1,
    height: 40,
    backgroundColor: '#d1d9e6',
    marginHorizontal: 20,
  },
  statusDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginBottom: 8,
  },
  statusLabel: {
    fontSize: 14,
    color: '#7f8c8d',
    marginBottom: 4,
  },
  statusValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c3e50',
  },

  // 기능 섹션
  featuresSection: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 16,
    paddingLeft: 4,
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  featureCardContainer: {
    width: (width - 60) / 2,
    marginBottom: 20,
  },
  featureCard: {
    height: 160,
  },
  featureIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    alignSelf: 'center',
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c3e50',
    textAlign: 'center',
    marginBottom: 8,
  },
  featureDesc: {
    fontSize: 12,
    color: '#7f8c8d',
    textAlign: 'center',
    lineHeight: 16,
    paddingHorizontal: 8,
  },

  // 액션 섹션
  actionsSection: {
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  actionsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  actionItem: {
    width: (width - 80) / 4,
  },
  actionButton: {
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  actionLabel: {
    fontSize: 12,
    color: '#2c3e50',
    textAlign: 'center',
    fontWeight: '500',
  },

  // 통계 섹션
  statsSection: {
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  statsCard: {
    padding: 24,
  },
  statsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 20,
    textAlign: 'center',
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 28,
    fontWeight: '700',
    color: '#667eea',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: '#7f8c8d',
    fontWeight: '500',
  },

  bottomSpacing: {
    height: 30,
  },
});