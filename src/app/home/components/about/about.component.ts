import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  template: `
    <app-topbar></app-topbar>
    <div class="wrapper">
      <div class="header-container">
        <div class="block">
          <div class="img-container">
            <img src="../../../../assets/images/armsPhoto.webp" alt="" />
          </div>
        </div>
        <div class="block">
          <div class="text-container">
            <h2>Welcome to FitLife!</h2>
            <p>
              FitLife is not just a fitness company - it is a community of
              healthy lifestyle enthusiasts who support each other in achieving
              their goals. Our company was born out of a passion for healthy
              living, physical activity and taking care of your body. Whether
              you're just getting started in fitness or you're an experienced
              athlete, at FitLife you'll find everything you need to achieve
              your fitness goals.
            </p>
            <h3>Our mission</h3>
            <p>
              At FitLife, we believe that everyone deserves a healthy, energized
              life. Our mission is to inspire people to take up physical
              activity, motivating them to train regularly and helping them
              achieve their dream fitness goals. Our highly qualified teams of
              instructors and personal trainers are here to help you with every
              step of your journey to health and good shape.
            </p>
          </div>
        </div>
      </div>
      <h3>What We Offer</h3>
      <div class="main-container">
        <div class="text-container-second">
          <ul>
            <li>
              <strong> Differentiated Training: </strong>
              We offer a variety of fitness classes, from intense cardio
              workouts, to strength training, to relaxing yoga sessions.
              Whatever your preference, we have something specifically for you.
            </li>
            <li>
              <strong> Personal Trainers: </strong>
              Our experienced personal trainers are ready to customize workouts
              to meet your individual needs, helping you achieve maximum
              results.
            </li>
            <li>
              <strong> Nutrition Planning: </strong>
              A healthy diet plays a key role in Achieving fitness goals. We
              offer personalized advice on nutrition to help you maintain a
              healthy balance.
            </li>
          </ul>
        </div>
        <div class="text-container-second">
          <ul>
            <li>
              <strong> Innovative Equipment: </strong>
              Our fitness center is equipped with state-of-the-art equipment for
              effective and safe safe workouts.
            </li>
            <li>
              <strong> Community Support: </strong>
              By joining our community, you will receive support from others
              who, like you, are striving to improve their health and
              well-being.
            </li>
            <li>
              <strong>
                Join

                FitLife </strong>
              today and start your journey to a a healthier, more active life.
              Whether you you want to lose weight, build muscle or simply
              improve your physical fitness!
            </li>
          </ul>
        </div>
      </div>
      <!-- <h3 class="last"> Dołącz do Nas Dziś!</h3> -->
    </div>
  `,
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent {}
