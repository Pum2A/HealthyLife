import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-training-details',
  template: `
    <app-sidebar></app-sidebar>
    <div class="main-container">
      <div class="main-text-container">
        <div *ngIf="trainingType">
          <div class="h2-container">
            <h2>{{ trainingInfo[trainingType]?.title }}</h2>
          </div>
          <div class="description-container">
            <p>
              <span>Description: </span>
              {{ trainingInfo[trainingType]?.description }}
            </p>
            <p>
              <span>Benefits: </span>{{ trainingInfo[trainingType]?.benefits }}
            </p>
            <p>
              <span>Price: </span>Training price is
              <span>
                {{ trainingInfo[trainingType]?.price }}
              </span>
              per/month
            </p>
          </div>
          <div class="button-container">
            <button>Buy a workout</button>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./training-details.component.scss'],
})
export class TrainingDetailsComponent implements OnInit {
  trainingType: string | null = null;

  trainingInfo: {
    [key: string]: {
      title: string;
      description: string;
      benefits: string;
      price: string;
    };
  } = {
    biceps: {
      title: 'Biceps Training',
      description:
        'Biceps training focuses on strengthening the muscles in the front of your upper arms, known as the biceps brachii. This type of training typically includes exercises like bicep curls and hammer curls. Biceps training helps improve arm strength and aesthetics.',
      benefits:
        'Increased arm strength, improved biceps definition, and enhanced upper body appearance.',
      price: '19,99$',
    },
    triceps: {
      title: 'Triceps Training',
      description:
        'Triceps training targets the muscles in the back of your upper arms, known as the triceps brachii. Exercises like tricep dips and tricep extensions are common in triceps training routines. Strengthening the triceps helps with pushing movements and overall arm strength.',
      benefits:
        'Enhanced triceps strength, improved arm stability, and better performance in pushing exercises.',
      price: '19,99$',
    },
    arms: {
      title: 'Arms Training',
      description:
        'Arms training combines biceps and triceps exercises to work on both the front and back of the upper arms. This comprehensive approach helps achieve balanced arm development and muscle symmetry.',
      benefits:
        'Balanced arm strength, improved overall arm aesthetics, and functional arm strength.',
      price: '19,99$',
    },
    chest: {
      title: 'Chest Training',
      description:
        ' Chest training focuses on strengthening the pectoral muscles in the chest area. Exercises like bench presses and chest flies are commonly included in chest workouts. Chest training is essential for building upper body strength and enhancing the appearance of the chest.',
      benefits:
        'Increased chest muscle mass, improved upper body power, and a more defined chest.',
      price: '19,99$',
    },
    legs: {
      title: 'Legs Training',
      description:
        'Legs training targets the muscles in the lower body, including the quadriceps, hamstrings, and calf muscles. Squats, lunges, and leg presses are typical exercises in leg training routines. Strengthening the legs is crucial for overall lower body ',
      benefits:
        'Stronger leg muscles, enhanced lower body performance, and improved posture and balance.',
      price: '19,99$',
    },
    back: {
      title: 'Back Training',
      description:
        'Back training is designed to strengthen the muscles of the back, including the latissimus dorsi, rhomboids, and trapezius. Exercises like pull-ups and rows are common in back workouts. A strong back supports good posture and overall upper body strength.',
      benefits:
        'Increased back muscle development, better posture, and improved upper body stability.',
      price: '19,99$',
    },
  };

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.trainingType = params.get('type');
    });
  }
}
