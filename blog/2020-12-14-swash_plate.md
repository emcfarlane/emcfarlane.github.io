---
slug: swash-plate
title: Cyclic/Collective Pitch Mixing
---

A swash plate is a vital part of a helicopter that controls the pitch of the blades as it rotates.
It's also one of the most complex pieces of a helicopter.
Quad-copters reduce this complexity by removing the swash plate altogether, trading efficiency for simplicity.
Instead of a swash plate you have a fixed blade and modulate the power to each.
Although this makes it simpler it is a large tradeoff, one that grows exponentially as the mass of the blades increases.
So how can we reduce the complexity and still keep the efficiency of a helicopter?
Lets make a simpler swash plate by mixing the conventional cyclic and pitch controls!

<!--truncate-->

## How it works

Part of my undergraduate work was to build a delta arm parallel robot as part of Aerial Robotics lab.
By actuating three servos you can control the $xyz$ position of an end effector.
It has many applications in industry as all the weight is moved to the base of the delta arm (the stationary part) enabling incredibly fast movements.

Similar to the delta arm robot we can use three actuators to control $height$, $roll$ and $pitch$ restricting movements in $xy$ and $yaw$.
This technique is known a cyclic/collective pitch mixing (CCPM).
With CCPM we can reduce the complexity of the swash plate whilst improving precision [$^{[1]}$](https://en.wikipedia.org/wiki/Cyclic/collective_pitch_mixing).
This technique is now applied in the new Mars Helicopter Ingenuity which will be landing on Mars in the next couple of months!

First: the idea. I sketched the basic layout and joints of how the interaction between the blades and the swash plate will work.
Now to the maths, how do we control the actuators?
![Swash plate sketch](/img/swash/IMG_0089.PNG)

## Calculating Servo Angles

Our goal is to control the collective and cyclic by actuating the angle of each servo.
We can determine which servo angles will allow the bearing to be in the current position using inverse kinematics.
There are three servos.
Each separated by $120^{\circ}$.
As there is only movement in the $z$ plane we can reduce the problem into the $2D$ space and iterate over the different servos.

![Swash plate sketch](/img/swash/sketch.jpg)

Our parameters are the placement of each component, in lengths:

- $l_a$ length of origin to servo
- $l_b$ length of bearing to joint
- $l_c$ length of servo to elbow, the servo arm
- $l_d$ length of elbow to joint
- $l_z$ length of origin to bearing, the height

Resolve the bearing angle to the 2D plane of the $i^{th}$ servo ($\in{0,1,2}$).
$$
\phi = \frac{2 \pi n_i }{3} \\
\\
\theta = \theta_x \cos{\phi} + \theta_y \sin{\phi} \\
$$

Vectors of $l_{bd}$, bearing position, and $l_{ac}$, the servo position.
$$
l_{bd} = \begin{bmatrix}
l_b \cos{\theta} \\
z + l_b \sin{\theta}
\end{bmatrix},\

l_{ac} = \begin{bmatrix}
l_a \\
0
\end{bmatrix}
$$

Distance $d$ between the two vectors.
$$
d = |l_{bd} - l_{ac}|
$$

Two circles are formed from the servo arm, $l_c$, and length to the joint, $l_d$.
We find the distance $x$ to the intersection points [$^{[2]}$](https://mathworld.wolfram.com/Circle-CircleIntersection.html)
and use that to determine the angle:
$$
x = \frac{d^2 - l_d^2 + l_c^2}{2 d} \\
$$

From the multiple intersections we are only concerned with outward facing one.
Finally, resolving our angle back into our original reference frame, we get the $i^{th}$ servo angle:
$$
\theta_i = \tan^{-1} \left(\frac{l_{bd}[1] - l_{ac}[1]}{l_{bd}[0] - l_{ac}[0]}\right) - \cos^{-1} \left(\frac{x}{l_c}\right)
$$


## Testing

To test I setup a servo driver with a Beaglebone Blue.
I built a cardboard setup, separating each servo by 120 degrees.
From here I changed the length parameters to visualise the effects on the range of movements.
This is something to optimise for in later revisions, but it works!

![Servo testing](/img/swash/IMG_0666.JPG)


## Future Work

Now my goal is to apply this to a proper RC model.
I'm using the Google Coral AI board and some shiny new servos!

![Servo testing](/img/swash/IMG_C3272E5698A0-1.jpeg)
