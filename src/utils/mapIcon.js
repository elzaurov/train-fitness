import AdvancedLevelIcon from '../assets/icons/advanced-level.png';
import BallIcon from '../assets/icons/ball.png';
import ConeIcon from '../assets/icons/cone.png';
import EasySetupIcon from '../assets/icons/easy-setup.png';
import FieldIcon from '../assets/icons/field.png';
import GoalIcon from '../assets/icons/goal.png';
import LadderIcon from '../assets/icons/ladder.png';
import LessonIcon from '../assets/icons/lesson.png';
import ShortWorkoutIcon from '../assets/icons/short-workout.png';
import SmallSpaceIcon from '../assets/icons/small-space.png';
import SoloIcon from '../assets/icons/solo.png';
import TacticalLessonIcon from '../assets/icons/tactical-lesson.png';
import TickIcon from '../assets/icons/tick.png';
import VideoIcon from '../assets/icons/video.png';
import WallIcon from '../assets/icons/wall.png';
import WorkoutIcon from '../assets/icons/workout.png';
import PlayIcon from '../assets/icons/play.png';
import PauseIcon from '../assets/icons/pause.png';
import DownloadIcon from '../assets/icons/download.png';

export default (name) => {
  switch (name) {
    case '2x Lessons':
      return LessonIcon;
    case '2x Videos':
      return VideoIcon;
    case 'Tactical Focus':
      return TacticalLessonIcon;
    case 'Advanced Level':
      return AdvancedLevelIcon;
    case '8x Workouts':
      return WorkoutIcon;
    case 'Solo Program':
      return SoloIcon;
    case 'Short Workout':
      return ShortWorkoutIcon;
    case 'Easy Setup':
      return EasySetupIcon;
    case '1x Ball':
      return BallIcon;
    case 'Small Space':
      return SmallSpaceIcon;
    case '2x Cones':
      return ConeIcon;
    case 'Half-Field Required':
      return FieldIcon;
    case '1/4 Field Required':
      return FieldIcon;
    case '1x Goal':
      return GoalIcon;
    case 'Wall Surface':
      return WallIcon;
    case 'Speed Ladder':
      return LadderIcon;
    case 'Tick':
      return TickIcon;
    case 'Play':
      return PlayIcon;
    case 'Pause':
      return PauseIcon;
    case 'Download':
      return DownloadIcon;
    default:
      return null;
  }
};
