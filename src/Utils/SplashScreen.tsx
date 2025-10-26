import React, { useEffect } from 'react';
import { StyleSheet, View, Text, Dimensions, StatusBar } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Animated, {
  useSharedValue,
  withTiming,
  withSpring,
  useAnimatedStyle,
  withRepeat,
  FadeIn,
  Easing
} from 'react-native-reanimated';
import { Lucide } from '@react-native-vector-icons/lucide';
import { useTheme } from '../Utils/ThemeProvider';

const { width } = Dimensions.get('window');

const LoadingDot: React.FC<{ delay: number }> = ({ delay }) => {
  const dotScale = useSharedValue(1);
  const dotOpacity = useSharedValue(0.6);
  const { theme } = useTheme();

  useEffect(() => {
    const timer = setTimeout(() => {
      dotScale.value = withRepeat(withTiming(1.5, { duration: 500 }), -1, true);
      dotOpacity.value = withRepeat(withTiming(1, { duration: 500 }), -1, true);
    }, delay * 1000);
    return () => clearTimeout(timer);
  }, [delay]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: dotScale.value }],
    opacity: dotOpacity.value,
  }));

  return <Animated.View style={[styles.dot, animatedStyle, { backgroundColor: theme.colors.dot }]} />;
};

export default function SplashScreen({ setShowSplash }: { setShowSplash: () => void }) {
  const { theme } = useTheme();

  const rotation = useSharedValue(-180);
  const scale = useSharedValue(0);
  const iconTranslateY = useSharedValue(0);
  const titleOpacity = useSharedValue(0);
  const titleTranslateY = useSharedValue(20);
  const subtitleOpacity = useSharedValue(0);
  const subtitleTranslateY = useSharedValue(20);

  const iconAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: scale.value },
      { rotate: `${rotation.value}deg` },
      { translateY: iconTranslateY.value },
    ],
  }));

  const titleAnimatedStyle = useAnimatedStyle(() => ({
    opacity: titleOpacity.value,
    transform: [{ translateY: titleTranslateY.value }],
  }));

  const subtitleAnimatedStyle = useAnimatedStyle(() => ({
    opacity: subtitleOpacity.value,
    transform: [{ translateY: subtitleTranslateY.value }],
  }));

  useEffect(() => {
    scale.value = withSpring(1, { stiffness: 260, damping: 20 });
    rotation.value = withSpring(0, { stiffness: 260, damping: 20 }, finished => {
      if (finished) {
        iconTranslateY.value = withRepeat(
          withTiming(-15, { duration: 2500, easing: Easing.inOut(Easing.ease) }),
          -1,
          true,
        );
      }
    });

    const titleTimer = setTimeout(() => {
      titleOpacity.value = withTiming(1, { duration: 600 });
      titleTranslateY.value = withTiming(0, { duration: 600 });
    }, 500);

    const subtitleTimer = setTimeout(() => {
      subtitleOpacity.value = withTiming(1, { duration: 600 });
      subtitleTranslateY.value = withTiming(0, { duration: 600 });
    }, 700);

    const exitTimer = setTimeout(() => {setShowSplash()}, 500 + 700 + 600 + 500);

    return () => {
      clearTimeout(titleTimer);
      clearTimeout(subtitleTimer);
      clearTimeout(exitTimer);
      iconTranslateY.value = 0;
    };
  }, []);

  return (
    <View style={[styles.fullScreenContainer, { backgroundColor: theme.colors.background }]}>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
      <LinearGradient
        colors={theme.colors.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.container}
      >
        <Animated.View style={styles.container}>
          <View style={styles.content}>
            <Animated.View style={iconAnimatedStyle}>
              <View
                style={[
                  styles.iconWrapper,
                  {
                    backgroundColor: theme.colors.iconBackground,
                    shadowColor: theme.shadow.color,
                    shadowOffset: theme.shadow.offset,
                    shadowOpacity: theme.shadow.opacity,
                    shadowRadius: theme.shadow.radius,
                  },
                ]}
              >
                <Lucide name="fuel" size={100} color={theme.colors.textPrimary} />
              </View>
            </Animated.View>

            <Animated.View style={[styles.textContainer, titleAnimatedStyle]}>
              <Text style={[styles.title, { color: theme.colors.textPrimary }]}>Fuel Master</Text>
            </Animated.View>

            <Animated.View style={[styles.textContainer, subtitleAnimatedStyle]}>
              <Text style={[styles.subtitle, { color: theme.colors.textSecondary }]}>
                Your Station's Digital Assistant
              </Text>
            </Animated.View>

            <Animated.View style={styles.loadingDots} entering={FadeIn.delay(1000).duration(500)}>
              <LoadingDot delay={0} />
              <LoadingDot delay={0.2} />
              <LoadingDot delay={0.4} />
            </Animated.View>
          </View>
        </Animated.View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  fullScreenContainer: { flex: 1 },
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  content: { flexDirection: 'column', alignItems: 'center', gap: 16 },
  iconWrapper: { padding: 30, borderRadius: 30 },
  textContainer: { alignItems: 'center' },
  title: { fontSize: 40, fontWeight: 'bold', letterSpacing: 2 },
  subtitle: { fontSize: 16, marginTop: -10 },
  loadingDots: { flexDirection: 'row', gap: 8, marginTop: 40 },
  dot: { width: 10, height: 10, borderRadius: 5 },
});
