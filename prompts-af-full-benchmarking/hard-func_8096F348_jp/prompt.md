You are decompiling an assembly function called `func_8096F348_jp` in MIPS from a Nintendo 64 game.

# Examples

## `aBALL_BGcheck`

```c
void aBALL_BGcheck(Ball* this) {
    UNUSED UNK_TYPE1 pad[0x4];
    f32 yVelocity;
    s32 hitWall;
    s16 wallAngle;
    s16 rot;
    xyz_t velocity;
    f32 sin;
    f32 cos;
    f32 sinCos;
    f32 speed;
    f32 adjustedSpeed;
    s32 rotMagnitude;

    yVelocity = this->actor.velocity.y;

    if ((this->process == aBALL_process_air_water) || (this->process == aBALL_process_ground_water) ||
        (this->actor.colCheck.colResult.unk5 == 0xB)) {
        mCoBG_BgCheckControll(&this->bgPos, &this->actor, 12.0f, -12.0f, 0, 1, 0);
        this->actor.world.pos.x += this->bgPos.x;
        this->actor.world.pos.z += this->bgPos.z;
    } else {
        mCoBG_BgCheckControll(&this->bgPos, &this->actor, 12.0f, -12.0f, 0, 0, 0);
        mRlib_Station_step_modify_to_wall(&this->actor);
    }

    if (((this->process == aBALL_process_air) || (this->process == aBALL_process_air_water)) &&
        this->actor.colCheck.colResult.onGround) {
        if (this->bounceTimer < 3) {
            do {
                this->bounceTimer++;
            } while (0);

            if (this->actor.colCheck.colResult.inWater) {
                this->actor.velocity.y = 0.2f;
            } else {
                this->actor.velocity.y = -yVelocity * 0.7f;
            }
        }
    }

    hitWall = this->actor.colCheck.colResult.hitWall;
    if (hitWall & 1) {
        wallAngle = mRlib_Get_HitWallAngleY(&this->actor);
        rot = this->actor.world.rot.y - wallAngle - 0x8000;
        rotMagnitude = ABS(rot);
        if (rotMagnitude < 0x4000) {
            velocity = this->actor.velocity;
            sin = sin_s(wallAngle);
            cos = cos_s(wallAngle);
            sinCos = sin * cos;
            speed = -((velocity.z * cos) + (velocity.x * sin));
            adjustedSpeed = (speed * 0.07f) + 1.2f;
            if (speed > 1.0f) {
                sAdo_OngenTrgStartSpeed(0x26, &this->actor.world.pos, speed);
            }
            this->actor.velocity.z =
                ((1.0f - (adjustedSpeed * cos * cos)) * velocity.z) - (velocity.x * adjustedSpeed * sinCos);
            this->actor.velocity.x =
                (-velocity.z * adjustedSpeed * sinCos) + (velocity.x * (1.0f - (adjustedSpeed * sin * sin)));
            mRlib_spdXZ_to_spdF_Angle(&this->actor.velocity, &this->actor.speed, &this->actor.world.rot.y);
        }
    }
}
```

```asm
         addiu sp, sp, -0x70
         sw s0, 0x28(sp)
         or s0, a0, zero
         sw ra, 0x2c(sp)
         lwc1 ft0, 0x6c(s0)
         lui t6, %hi(aBALL_process_air_water)
         addiu t6, t6, %lo(aBALL_process_air_water)
         sw t6, 0x38(sp)
         swc1 ft0, 0x68(sp)
         lw v0, 0x1e0(s0)
         lui t7, %hi(aBALL_process_ground_water)
         addiu t7, t7, %lo(aBALL_process_ground_water)
         beq t6, v0, .L5c23
         addiu a0, s0, 0x1d0
         beql t7, v0, .L6024
         addiu t1, zero, 0x1
         lw t8, 0x98(s0)
         addiu at, zero, 0xb
         or a1, s0, zero
         sll t9, t8, 15
         srl t0, t9, 26
         bne t0, at, .La040
         lui a2, 0x4140
     12addiu t1, zero, 0x1
     14sw t1, 0x14(sp)
         or a1, s0, zero
         lui a2, 0x4140
         lui a3, 0xc140
         sw zero, 0x10(sp)
         jal mCoBG_BgCheckControll
         sw zero, 0x18(sp)
         lwc1 ft1, 0x28(s0)
         lwc1 ft2, 0x1d0(s0)
         lwc1 ft0, 0x30(s0)
         add.s ft3, ft1, ft2
         lwc1 ft1, 0x1d8(s0)
         add.s ft2, ft0, ft1
         swc1 ft3, 0x28(s0)
         b .Lc048
         swc1 ft2, 0x30(s0)
     21addiu a0, s0, 0x1d0
         lui a3, 0xc140
         sw zero, 0x10(sp)
         sw zero, 0x14(sp)
         jal mCoBG_BgCheckControll
         sw zero, 0x18(sp)
         jal mRlib_Station_step_modify_to_wall
         or a0, s0, zero
     38lw v0, 0x1e0(s0)
         lui t2, %hi(aBALL_process_air)
         addiu t2, t2, %lo(aBALL_process_air)
         beq t2, v0, .Ldc55
         lw t3, 0x38(sp)
         bnel t3, v0, .L13c79
         lw v0, 0x98(s0)
     51lw t4, 0x98(s0)
         srl t5, t4, 31
         beqzl t5, .L13c79
         lw v0, 0x98(s0)
         lh v0, 0x206(s0)
         slti at, v0, 0x3
         beqzl at, .L13c79
         lw v0, 0x98(s0)
         lw t7, 0x98(s0)
         addiu t6, v0, 0x1
         sh t6, 0x206(s0)
         sll t9, t7, 22
         bgez t9, .L12473
         lwc1 ft0, 0x68(sp)
         lui at, %hi([.rodata]+0x2c)
         lwc1 ft3, %lo([.rodata]+0x2c)(at)
         b .L13878
         swc1 ft3, 0x6c(s0)
     67lui at, %hi([.rodata]+0x30)
         lwc1 ft2, %lo([.rodata]+0x30)(at)
         neg.s ft1, ft0
         mul.s ft3, ft1, ft2
         swc1 ft3, 0x6c(s0)
     71lw v0, 0x98(s0)
     53sll v0, v0, 6
         srl v0, v0, 27
         andi t0, v0, 0x1
         beqzl t0, .L2c8178
         lw ra, 0x2c(sp)
         jal mRlib_Get_HitWallAngleY
         or a0, s0, zero
         lh t1, 0x36(s0)
         addiu at, zero, -0x8000
         sll a0, v0, 16
         subu v1, t1, v0
         addu v1, v1, at
         sll v1, v1, 16
         sra v1, v1, 16
         bltz v1, .L18497
         sra a0, a0, 16
         b .L18898
         or v0, v1, zero
     93negu v0, v1
     95slti at, v0, 0x4000
         beqz at, .L2c4177
         addiu v0, s0, 0x68
         lw t4, 0x0(v0)
         addiu t2, sp, 0x54
         sw t4, 0x0(t2)
         lw t3, 0x4(v0)
         sw t3, 0x4(t2)
         lw t4, 0x8(v0)
         sw t4, 0x8(t2)
         sh a0, 0x62(sp)
         jal sin_s
         sw v0, 0x38(sp)
         lh a0, 0x62(sp)
         jal cos_s
         swc1 fv0, 0x50(sp)
         lwc1 fa0, 0x50(sp)
         lwc1 ft0, 0x5c(sp)
         lwc1 ft2, 0x54(sp)
         mul.s ft5, fa0, fv0
         lui at, %hi([.rodata]+0x34)
         mov.s ft4, fv0
         mul.s ft1, ft0, fv0
         lwc1 ft0, %lo([.rodata]+0x34)(at)
         lui at, %hi([.rodata]+0x38)
         mul.s ft3, ft2, fa0
         addiu a0, zero, 0x26
         addiu a1, s0, 0x28
         add.s fv1, ft1, ft3
         lwc1 ft1, %lo([.rodata]+0x38)(at)
         lui at, 0x3f80
         mtc1 at, ft3
         neg.s fv1, fv1
         mul.s ft2, fv1, ft0
         c.lt.s ft3, fv1
         swc1 fv1, 0x44(sp)
         lw a2, 0x44(sp)
         bc1f .L248146
         add.s fa1, ft2, ft1
         swc1 fa0, 0x50(sp)
         swc1 fa1, 0x40(sp)
         swc1 ft4, 0x4c(sp)
         jal sAdo_OngenTrgStartSpeed
         swc1 ft5, 0x48(sp)
         lwc1 fa0, 0x50(sp)
         lwc1 fa1, 0x40(sp)
         lwc1 ft4, 0x4c(sp)
         lwc1 ft5, 0x48(sp)
     135mul.s ft2, fa1, ft4
         lui at, 0x3f80
         mtc1 at, ft0
         addiu a1, s0, 0x74
         addiu a2, s0, 0x36
         mul.s ft1, ft2, ft4
         lwc1 ft2, 0x5c(sp)
         sub.s ft3, ft0, ft1
         lwc1 ft1, 0x54(sp)
         mul.s ft0, ft3, ft2
         nop 
         mul.s ft3, ft1, fa1
         nop 
         mul.s ft2, ft3, ft5
         mtc1 at, ft3
         sub.s ft1, ft0, ft2
         mul.s ft0, fa1, fa0
         swc1 ft1, 0x70(s0)
         mul.s ft2, ft0, fa0
         lwc1 ft0, 0x54(sp)
         sub.s ft1, ft3, ft2
         lwc1 ft2, 0x5c(sp)
         mul.s ft3, ft0, ft1
         neg.s ft0, ft2
         mul.s ft1, ft0, fa1
         nop 
         mul.s ft2, ft1, ft5
         add.s ft0, ft2, ft3
         swc1 ft0, 0x68(s0)
         jal mRlib_spdXZ_to_spdF_Angle
         lw a0, 0x38(sp)
     99lw ra, 0x2c(sp)
     82lw s0, 0x28(sp)
         addiu sp, sp, 0x70
         jr ra
         nop 
```

## `cKF_SkeletonInfo_R_AnimationMove_base`

```c
void cKF_SkeletonInfo_R_AnimationMove_base(xyz_t* arg0, s_xyz* arg1, xyz_t* arg2, s16 arg3,
                                           SkeletonInfoR* skeletonInfo) {
    u32 transformationFlag = skeletonInfo->animationMove.transformationFlag;
    f32 counter = skeletonInfo->animationMove.counter;
    f32 count;
    f32 var_ft4;

    count = counter + 1.0f;
    if (count > 1.0f) {
        var_ft4 = 1.0f / count;
    } else {
        var_ft4 = 0.0f;
    }

    if (transformationFlag & 4) {
        f32 temp6 = skeletonInfo->animationMove.shapeAngleCorrection;

        if (count > 1.0f) {
            temp6 *= var_ft4;
            skeletonInfo->animationMove.shapeAngleCorrection -= (s16)temp6;
        } else {
            skeletonInfo->animationMove.shapeAngleCorrection = 0;
        }
    }
    if (count > 1.0f) {
        if (transformationFlag & 1) {
            f32 posXTemp;
            f32 posZTemp;

            posXTemp = skeletonInfo->animationMove.shapeWorldPositionCorrection.x;
            posXTemp *= var_ft4;

            posZTemp = skeletonInfo->animationMove.shapeWorldPositionCorrection.z;
            posZTemp *= var_ft4;

            skeletonInfo->animationMove.shapeWorldPositionCorrection.x -= posXTemp;
            skeletonInfo->animationMove.shapeWorldPositionCorrection.z -= posZTemp;
        }
        if (transformationFlag & 2) {
            f32 posYTemp;

            posYTemp = skeletonInfo->animationMove.shapeWorldPositionCorrection.y;
            posYTemp *= var_ft4;

            skeletonInfo->animationMove.shapeWorldPositionCorrection.y -= posYTemp;
        }
    } else {
        skeletonInfo->animationMove.shapeWorldPositionCorrection.x = 0.0f;
        skeletonInfo->animationMove.shapeWorldPositionCorrection.y = 0.0f;
        skeletonInfo->animationMove.shapeWorldPositionCorrection.z = 0.0f;
    }

    if ((arg1 != NULL) && (transformationFlag & 4)) {
        s32 sp8C = skeletonInfo->animationMove.baseAngleY;
        s32 sp88 = skeletonInfo->animationMove.shapeAngleCorrection;
        s_xyz* sp28 = &skeletonInfo->animationMove.updatedBaseShapeRotation;
        s32 sp80 = skeletonInfo->animationMove.baseShapeRotation.x;
        s32 temp;

        Matrix_push();
        Matrix_rotateXYZ(skeletonInfo->jointTable[1].x, skeletonInfo->jointTable[1].y, skeletonInfo->jointTable[1].z,
                         0);
        Matrix_to_rotate2_new(get_Matrix_now(), sp28, 0);
        Matrix_pull();
        temp = sp28->x - sp80;
        arg1->x = (sp8C + sp88) + temp;
    }

    if (arg0 != NULL) {
        s_xyz* sp78 = skeletonInfo->jointTable;
        s16 var_a0 = 0;

        if (arg1 != NULL) {
            var_a0 = arg1->x - arg3;
        }

        if (transformationFlag & 1) {
            f32 baseTranslationXTemp = skeletonInfo->animationMove.baseShapeTranslation.x;
            f32 baseTranslationZTemp = skeletonInfo->animationMove.baseShapeTranslation.z;
            f32 sin1 = sin_s(var_a0);
            f32 cos1 = cos_s(var_a0);
            s32 pad[2] UNUSED;
            f32 move_x = arg2->x * (sp78->x - ((baseTranslationXTemp * cos1) + (baseTranslationZTemp * sin1)));
            f32 move_z = arg2->z * (sp78->z - ((-baseTranslationXTemp * sin1) + (baseTranslationZTemp * cos1)));
            f32 sin2 = sin_s(arg3);
            f32 cos2 = cos_s(arg3);
            f32 correctBaseWorldXTemp = skeletonInfo->animationMove.shapeWorldPositionCorrection.x;
            f32 correctBaseWorldZTemp = skeletonInfo->animationMove.shapeWorldPositionCorrection.z;
            s32 pad2[2] UNUSED;

            arg0->x = (skeletonInfo->animationMove.baseWorldPosition.x + correctBaseWorldXTemp) +
                      ((move_x * cos2) + (move_z * sin2));
            arg0->z = (skeletonInfo->animationMove.baseWorldPosition.z + correctBaseWorldZTemp) +
                      ((-move_x * sin2) + (move_z * cos2));
        }

        if (transformationFlag & 2) {
            f32 yTemp = skeletonInfo->animationMove.baseShapeTranslation.y;
            f32 temp3 = (arg2->y * (sp78->y - yTemp));
            f32 new_var = skeletonInfo->animationMove.shapeWorldPositionCorrection.y;

            arg0->y = (skeletonInfo->animationMove.baseWorldPosition.y + new_var) + temp3;
        }
    }
    counter -= 1.0f;

    if (counter < 0.0f) {
        counter = 0.0f;
    }

    skeletonInfo->animationMove.counter = counter;
}
```

```asm
         addiu sp, sp, -0xb0
         lui at, 0x3f80
         sw s0, 0x18(sp)
         mtc1 at, ft5
         lw s0, 0xc0(sp)
         sw ra, 0x1c(sp)
         sw a0, 0xb0(sp)
         sw a1, 0xb4(sp)
         sw a2, 0xb8(sp)
         sw a3, 0xbc(sp)
         lwc1 ft0, 0x5c(s0)
         lw v1, 0x30(s0)
         swc1 ft0, 0xa8(sp)
         lwc1 ft1, 0xa8(sp)
         andi a0, v1, 0x4
         add.s fv1, ft1, ft5
         c.lt.s ft5, fv1
         nop 
         bc1fl .L5c23
         mtc1 zero, ft4
         b .L6024
         div.s ft4, ft5, fv1
         mtc1 zero, ft4
     18nop 
     20beqz a0, .L9c39
         andi t1, v1, 0x1
         lh v0, 0x6c(s0)
         c.lt.s ft5, fv1
         mtc1 v0, ft2
         bc1f .L9838
         cvt.s.w fv0, ft2
         mul.s fv0, fv0, ft4
         trunc.w.s ft3, fv0
         mfc1 t9, ft3
         nop 
         subu t0, v0, t9
         b .L9c39
         sh t0, 0x6c(s0)
     29sh zero, 0x6c(s0)
     24c.lt.s ft5, fv1
         andi t2, v1, 0x2
         bc1fl .Lfc63
         mtc1 zero, ft3
         beqz t1, .Ld854
         nop 
         lwc1 fa0, 0x60(s0)
         lwc1 fa1, 0x68(s0)
         mul.s fv0, fa0, ft4
         nop 
         mul.s fv1, fa1, ft4
         sub.s ft0, fa0, fv0
         sub.s ft1, fa1, fv1
         swc1 ft0, 0x60(s0)
         swc1 ft1, 0x68(s0)
     43beqzl t2, .L11469
         lw t3, 0xb4(sp)
         lwc1 fv1, 0x64(s0)
         mul.s fv0, fv1, ft4
         sub.s ft2, fv1, fv0
         swc1 ft2, 0x64(s0)
         b .L11469
         lw t3, 0xb4(sp)
         mtc1 zero, ft3
     41mtc1 zero, ft0
         mtc1 zero, ft1
         swc1 ft3, 0x60(s0)
         swc1 ft0, 0x64(s0)
         swc1 ft1, 0x68(s0)
         lw t3, 0xb4(sp)
     54beqzl t3, .L1bc111
         lw t5, 0xb0(sp)
         beqzl a0, .L1bc111
         lw t5, 0xb0(sp)
         lh t4, 0x40(s0)
         sw t4, 0x8c(sp)
         lh t5, 0x6c(s0)
         sw t5, 0x88(sp)
         lh t6, 0x50(s0)
         sw v1, 0xac(sp)
         jal Matrix_push
         sw t6, 0x80(sp)
         lw v0, 0x24(s0)
         or a3, zero, zero
         lh a0, 0x6(v0)
         lh a1, 0x8(v0)
         jal Matrix_rotateXYZ
         lh a2, 0xa(v0)
         jal get_Matrix_now
         nop 
         addiu a1, s0, 0x56
         sw a1, 0x28(sp)
         or a0, v0, zero
         jal Matrix_to_rotate2_new
         or a2, zero, zero
         jal Matrix_pull
         nop 
         lw t7, 0x28(sp)
         lw t9, 0x80(sp)
         lw t0, 0x8c(sp)
         lw t1, 0x88(sp)
         lh t8, 0x0(t7)
         lw t4, 0xb4(sp)
         addu t2, t0, t1
         subu v0, t8, t9
         lw v1, 0xac(sp)
         addu t3, t2, v0
         sh t3, 0x0(t4)
         lui at, 0x3f80
         mtc1 at, ft5
         nop 
         lw t5, 0xb0(sp)
     69or a0, zero, zero
         andi v0, v1, 0x1
         beqz t5, .L348210
         andi t7, v1, 0x2
         lw t8, 0xb4(sp)
         lw t6, 0x24(s0)
         sw t7, 0x24(sp)
         beqz t8, .L1f4125
         sw t6, 0x78(sp)
         lh t9, 0x0(t8)
         lh t0, 0xbe(sp)
         subu a0, t9, t0
         sll a0, a0, 16
         sra a0, a0, 16
     118beqzl v0, .L304193
         lw t6, 0x24(sp)
         lwc1 ft2, 0x44(s0)
         swc1 ft2, 0x70(sp)
         lwc1 ft3, 0x4c(s0)
         sh a0, 0x76(sp)
         jal sin_s
         swc1 ft3, 0x6c(sp)
         lh a0, 0x76(sp)
         jal cos_s
         swc1 fv0, 0x68(sp)
         lwc1 fa0, 0x70(sp)
         lwc1 fv1, 0x68(sp)
         lwc1 fa1, 0x6c(sp)
         mul.s ft0, fa0, fv0
         lw v0, 0x78(sp)
         lw t2, 0xb8(sp)
         mul.s ft1, fa1, fv1
         lh t1, 0x0(v0)
         lh a0, 0xbe(sp)
         mtc1 t1, ft3
         add.s ft2, ft0, ft1
         cvt.s.w ft0, ft3
         lwc1 ft3, 0x0(t2)
         sub.s ft1, ft0, ft2
         neg.s ft2, fa0
         mul.s ft0, ft3, ft1
         swc1 ft0, 0x58(sp)
         mul.s ft3, ft2, fv1
         lh t3, 0x4(v0)
         mul.s ft1, fa1, fv0
         mtc1 t3, ft2
         add.s ft0, ft3, ft1
         cvt.s.w ft3, ft2
         lwc1 ft2, 0x8(t2)
         sub.s ft1, ft3, ft0
         mul.s ft3, ft2, ft1
         jal sin_s
         swc1 ft3, 0x54(sp)
         lh a0, 0xbe(sp)
         jal cos_s
         swc1 fv0, 0x50(sp)
         lwc1 ft4, 0x58(sp)
         lwc1 fa1, 0x50(sp)
         lwc1 ft5, 0x54(sp)
         mul.s ft0, ft4, fv0
         lwc1 fv1, 0x60(s0)
         lwc1 ft3, 0x34(s0)
         mul.s ft2, ft5, fa1
         lw t4, 0xb0(sp)
         lwc1 fa0, 0x68(s0)
         lui at, 0x3f80
         add.s ft1, ft0, ft2
         add.s ft0, ft3, fv1
         neg.s ft3, ft4
         add.s ft2, ft0, ft1
         mul.s ft0, ft3, fa1
         nop 
         mul.s ft1, ft5, fv0
         swc1 ft2, 0x0(t4)
         lwc1 ft3, 0x3c(s0)
         lw t5, 0xb0(sp)
         mtc1 at, ft5
         add.s ft2, ft0, ft1
         add.s ft0, ft3, fa0
         add.s ft1, ft0, ft2
         swc1 ft1, 0x8(t5)
         lw t6, 0x24(sp)
     125lw t8, 0x78(sp)
         beqzl t6, .L34c211
         lwc1 ft1, 0xa8(sp)
         lh t9, 0x2(t8)
         lwc1 fv0, 0x48(s0)
         lw t7, 0xb8(sp)
         mtc1 t9, ft0
         lwc1 fa0, 0x64(s0)
         lwc1 ft3, 0x4(t7)
         cvt.s.w ft2, ft0
         lwc1 ft0, 0x38(s0)
         lw t0, 0xb0(sp)
         sub.s ft1, ft2, fv0
         add.s ft2, ft0, fa0
         mul.s fv1, ft3, ft1
         add.s ft3, ft2, fv1
         swc1 ft3, 0x4(t0)
     113lwc1 ft1, 0xa8(sp)
     194mtc1 zero, fv0
         sub.s ft0, ft1, ft5
         c.lt.s ft0, fv0
         swc1 ft0, 0xa8(sp)
         bc1fl .L36c219
         lwc1 ft2, 0xa8(sp)
         swc1 fv0, 0xa8(sp)
         lwc1 ft2, 0xa8(sp)
     215swc1 ft2, 0x5c(s0)
         lw ra, 0x1c(sp)
         lw s0, 0x18(sp)
         jr ra
         addiu sp, sp, 0xb0
```

## `aFSN_moving`

```c
void aFSN_moving(Actor* thisx, Game_Play* game_play) {
    static Vec2s senkou_check_data[3] = {
        { -1, -2500 },
        { 0, 0 },
        { 0, 2500 },
    };
    Fuusen* this = THIS;
    f32 balloonGroundY = mCoBG_GetBalloonGroundY(&this->actor.world.pos) + this->heightOffset;
    UNUSED UNK_TYPE1 pad[0x4];
    u16* unitFG;
    xyz_t screenPos;
    f32 distX;
    f32 distY;
    f32 distZ;
    s32 i;
    s16 yRot;

    if (this->escapeTimer > 0) {
        this->escapeTimer--;
    } else {
        if ((this->actor.world.pos.x <= 660.0f) || (this->actor.world.pos.x >= 3820.0f) ||
            (this->actor.world.pos.z <= 660.0f) || (this->actor.world.pos.z >= 4460.0f)) {
            this->escapeTimer = 777;
            aFSN_setupAction(this, FSN_PROCESS_ESCAPE, game_play);
            return;
        } else if ((this->actor.world.pos.x <= 2440.0f) && (this->actor.world.pos.x >= 2040.0f) &&
                   (this->actor.world.pos.z <= 960.0f) && (this->actor.world.pos.z >= 800.0f)) {
            this->escapeTimer = 777;
            aFSN_setupAction(this, FSN_PROCESS_ESCAPE, game_play);
            return;
        }
    }
    this->windPower = mEnv_GetWindPowerF();
    this->heightAmplitudeCounter += 500;
    this->actor.speed = this->windPower * 0.5f + 1.0f;
    add_calc(&this->actor.world.pos.y, (sin_s(this->heightAmplitudeCounter) * 10.0f) + balloonGroundY, 0.3f, 1.0f,
             0.0f);
    Game_play_Projection_Trans(game_play, &this->actor.world.pos, &screenPos);
    if (!(screenPos.x < -40.0f) && !(screenPos.x > 360.0f) && !(screenPos.y < -40.0f) && !(screenPos.y > 280.0f)) {
        mCoBG_BgCheckControll(NULL, &this->actor, 12.0f, 0, 0, 0, 0);
        if (this->actor.colCheck.colResult.hitWall & 1 || this->actor.colCheck.colResult.unk1 & 1) {
            this->heightOffset += 0.01f;
            if (this->heightOffset >= 300.0f) {
                this->heightOffset = 300.0f;
            }
        } else {
            if (this->heightOffset > 110.0f) {
                this->heightOffset -= 0.01f;
            }
        }
        unitFG = mFI_GetUnitFG(this->actor.world.pos);
        if ((unitFG != NULL) && ((*unitFG == TREE) || (*unitFG == TREE_APPLE_NOFRUIT_0) ||
                                 (*unitFG == TREE_ORANGE_NOFRUIT_0) || (*unitFG == TREE_PEACH_NOFRUIT_0) ||
                                 (*unitFG == TREE_PEAR_NOFRUIT_0) || (*unitFG == TREE_CHERRY_NOFRUIT_0) ||
                                 (*unitFG == TREE_APPLE_NOFRUIT_1) || (*unitFG == TREE_ORANGE_NOFRUIT_1) ||
                                 (*unitFG == TREE_PEACH_NOFRUIT_1) || (*unitFG == TREE_PEAR_NOFRUIT_1) ||
                                 (*unitFG == TREE_CHERRY_NOFRUIT_1) || (*unitFG == TREE_APPLE_NOFRUIT_2) ||
                                 (*unitFG == TREE_ORANGE_NOFRUIT_2) || (*unitFG == TREE_PEACH_NOFRUIT_2) ||
                                 (*unitFG == TREE_PEAR_NOFRUIT_2) || (*unitFG == TREE_CHERRY_NOFRUIT_2))) {
            mFI_Wpos2UtCenterWpos(&screenPos, this->actor.world.pos);
            screenPos.x -= 2.5f;
            screenPos.y = mCoBG_GetBgY_OnlyCenter_FromWpos2(this->actor.world.pos, 0.0f) + 97.5f;
            screenPos.z += 7.5f;
            distX = screenPos.x - this->actor.world.pos.x;
            distY = screenPos.y - this->actor.world.pos.y;
            distZ = screenPos.z - this->actor.world.pos.z;
            if ((sqrtf(SQ(distX) + SQ(distZ)) < 15.0f) && (sqrtf(SQ(distY)) < 15.0f)) {
                aFSN_setupAction(this, FSN_PROCESS_WOOD_STOP, game_play);
            }
        } else {
            if (!this->unk_1A4) {
            // FAKE
            dummy_label:
                for (i = 0; i < ARRAY_COUNT(senkou_check_data); i++) {
                    xyz_t_move(&screenPos, &this->actor.world.pos);
                    yRot = senkou_check_data[i].z + this->actor.world.rot.y;
                    screenPos.x += sin_s(yRot) * 80.0f;
                    screenPos.z += cos_s(yRot) * 80.0f;
                    unitFG = mFI_GetUnitFG(screenPos);
                    if ((unitFG != NULL) && ((*unitFG == TREE) || (*unitFG == TREE_APPLE_NOFRUIT_0) ||
                                             (*unitFG == TREE_ORANGE_NOFRUIT_0) || (*unitFG == TREE_PEACH_NOFRUIT_0) ||
                                             (*unitFG == TREE_PEAR_NOFRUIT_0) || (*unitFG == TREE_CHERRY_NOFRUIT_0) ||
                                             (*unitFG == TREE_APPLE_NOFRUIT_1) || (*unitFG == TREE_ORANGE_NOFRUIT_1) ||
                                             (*unitFG == TREE_PEACH_NOFRUIT_1) || (*unitFG == TREE_PEAR_NOFRUIT_1) ||
                                             (*unitFG == TREE_CHERRY_NOFRUIT_1) || (*unitFG == TREE_APPLE_NOFRUIT_2) ||
                                             (*unitFG == TREE_ORANGE_NOFRUIT_2) || (*unitFG == TREE_PEACH_NOFRUIT_2) ||
                                             (*unitFG == TREE_PEAR_NOFRUIT_2) || (*unitFG == TREE_CHERRY_NOFRUIT_2))) {
                        this->actor.world.rot.y = yRot;
                        this->unk_1A4 = true;
                        break;
                    }
                }
            }
            if (!this->unk_1A4) {
                this->actor.world.rot.y = mEnv_GetWindAngleS();
            }
        }
    }
}
```

```asm
         addiu sp, sp, -0x78
         sw s2, 0x30(sp)
         sw s0, 0x28(sp)
         or s0, a1, zero
         or s2, a0, zero
         sw ra, 0x34(sp)
         sw s1, 0x2c(sp)
         addiu a0, s2, 0x28
         jal mCoBG_GetBalloonGroundY
         sw a0, 0x40(sp)
         lwc1 ft0, 0x1a0(s2)
         lui at, 0x4425
         add.s ft1, fv0, ft0
         swc1 ft1, 0x70(sp)
         lw v0, 0x184(s2)
         blez v0, .L4c19
         addiu t6, v0, -0x1
         b .L14080
         sw t6, 0x184(s2)
     15mtc1 at, fa0
         lwc1 fv1, 0x28(s2)
         lui at, %hi([.rodata])
         addiu t7, zero, 0x309
         c.le.s fv1, fa0
         or a0, s2, zero
         addiu a1, zero, 0x3
         or a2, s0, zero
         bc1t .Lb846
         nop 
         lwc1 ft2, %lo([.rodata])(at)
         c.le.s ft2, fv1
         nop 
         bc1t .Lb846
         nop 
         lwc1 fv0, 0x30(s2)
         lui at, %hi([.rodata]+0x4)
         c.le.s fv0, fa0
         nop 
         bc1t .Lb846
         nop 
         lwc1 ft3, %lo([.rodata]+0x4)(at)
         lui at, %hi([.rodata]+0x8)
         c.le.s ft3, fv0
         nop 
         bc1f .Lc850
         nop 
     27jal aFSN_setupAction
         sw t7, 0x184(s2)
         b .L5e4377
         lw ra, 0x34(sp)
     44lwc1 ft5, %lo([.rodata]+0x8)(at)
         lui at, 0x44ff
         c.le.s fv1, ft5
         nop 
         bc1f .L14080
         nop 
         mtc1 at, ft0
         lui at, 0x4470
         c.le.s ft0, fv1
         nop 
         bc1f .L14080
         nop 
         mtc1 at, ft1
         lui at, 0x4448
         c.le.s fv0, ft1
         nop 
         bc1f .L14080
         nop 
         mtc1 at, ft2
         addiu t8, zero, 0x309
         or a0, s2, zero
         c.le.s ft2, fv0
         addiu a1, zero, 0x3
         or a2, s0, zero
         bc1f .L14080
         nop 
         jal aFSN_setupAction
         sw t8, 0x184(s2)
         b .L5e4377
         lw ra, 0x34(sp)
     17jal mEnv_GetWindPowerF
         nop 
         lui at, 0x3f00
         mtc1 at, ft3
         lui at, 0x3f80
         mtc1 at, ft0
         mul.s ft5, fv0, ft3
         lh t9, 0x198(s2)
         swc1 fv0, 0x19c(s2)
         addiu t0, t9, 0x1f4
         sh t0, 0x198(s2)
         lh a0, 0x198(s2)
         add.s ft1, ft5, ft0
         jal sin_s
         swc1 ft1, 0x74(s2)
         lui at, 0x4120
         mtc1 at, ft2
         lwc1 ft5, 0x70(sp)
         mtc1 zero, ft1
         mul.s ft3, fv0, ft2
         lui a2, 0x3e99
         ori a2, a2, 0x999a
         addiu a0, s2, 0x2c
         lui a3, 0x3f80
         swc1 ft1, 0x10(sp)
         add.s ft0, ft3, ft5
         mfc1 a1, ft0
         jal add_calc
         nop 
         or a0, s0, zero
         lw a1, 0x40(sp)
         jal Game_play_Projection_Trans
         addiu a2, sp, 0x5c
         lui at, 0xc220
         mtc1 at, fa0
         lwc1 fv1, 0x5c(sp)
         lui at, 0x43b4
         c.lt.s fv1, fa0
         nop 
         bc1tl .L5e4377
         lw ra, 0x34(sp)
         mtc1 at, ft2
         lwc1 fv0, 0x60(sp)
         c.lt.s ft2, fv1
         nop 
         bc1tl .L5e4377
         lw ra, 0x34(sp)
         c.lt.s fv0, fa0
         lui at, 0x438c
         bc1tl .L5e4377
         lw ra, 0x34(sp)
         mtc1 at, ft3
         or a0, zero, zero
         or a1, s2, zero
         c.lt.s ft3, fv0
         lui a2, 0x4140
         addiu a3, zero, 0x0
         bc1tl .L5e4377
         lw ra, 0x34(sp)
         sw zero, 0x10(sp)
         sw zero, 0x14(sp)
         jal mCoBG_BgCheckControll
         sw zero, 0x18(sp)
         lw v0, 0x98(s2)
         lui at, 0x4396
         sll t1, v0, 6
         srl t2, t1, 27
         andi t3, t2, 0x1
         bnez t3, .L268154
         sll t4, v0, 1
         srl t5, t4, 27
         andi t6, t5, 0x1
         beqzl t6, .L2a0168
         lui at, 0x42dc
     148mtc1 at, fv0
         lui at, %hi([.rodata]+0xc)
         lwc1 ft0, %lo([.rodata]+0xc)(at)
         lwc1 ft5, 0x1a0(s2)
         add.s ft1, ft5, ft0
         swc1 ft1, 0x1a0(s2)
         lwc1 ft2, 0x1a0(s2)
         c.le.s fv0, ft2
         nop 
         bc1fl .L2cc179
         lw t7, 0x40(sp)
         b .L2c8178
         swc1 fv0, 0x1a0(s2)
         lui at, 0x42dc
     152mtc1 at, ft3
         lwc1 fv0, 0x1a0(s2)
         lui at, %hi([.rodata]+0x10)
         c.lt.s ft3, fv0
         nop 
         bc1fl .L2cc179
         lw t7, 0x40(sp)
         lwc1 ft5, %lo([.rodata]+0x10)(at)
         sub.s ft0, fv0, ft5
         swc1 ft0, 0x1a0(s2)
     165lw t7, 0x40(sp)
     163lw t9, 0x0(t7)
         sw t9, 0x0(sp)
         lw a1, 0x4(t7)
         lw a0, 0x0(sp)
         sw a1, 0x4(sp)
         lw a2, 0x8(t7)
         jal mFI_GetUnitFG
         sw a2, 0x8(sp)
         beqzl v0, .L480288
         lbu v0, 0x1a4(s2)
         lhu v1, 0x0(v0)
         addiu at, zero, 0x804
         lw t0, 0x40(sp)
         beq v1, at, .L380224
         addiu at, zero, 0x809
         beq v1, at, .L380224
         addiu at, zero, 0x811
         beq v1, at, .L380224
         addiu at, zero, 0x819
         beq v1, at, .L380224
         addiu at, zero, 0x821
         beq v1, at, .L380224
         addiu at, zero, 0x829
         beq v1, at, .L380224
         addiu at, zero, 0x80a
         beq v1, at, .L380224
         addiu at, zero, 0x812
         beq v1, at, .L380224
         addiu at, zero, 0x81a
         beq v1, at, .L380224
         addiu at, zero, 0x822
         beq v1, at, .L380224
         addiu at, zero, 0x82a
         beq v1, at, .L380224
         addiu at, zero, 0x80b
         beq v1, at, .L380224
         addiu at, zero, 0x813
         beq v1, at, .L380224
         addiu at, zero, 0x81b
         beq v1, at, .L380224
         addiu at, zero, 0x823
         beq v1, at, .L380224
         addiu at, zero, 0x82b
         bnel v1, at, .L480288
         lbu v0, 0x1a4(s2)
     192lw t2, 0x0(t0)
         addiu a0, sp, 0x5c
         sw t2, 0x4(sp)
         lw a2, 0x4(t0)
         lw a1, 0x4(sp)
         sw a2, 0x8(sp)
         lw a3, 0x8(t0)
         jal mFI_Wpos2UtCenterWpos
         sw a3, 0xc(sp)
         lui at, 0x4020
         mtc1 at, ft2
         lwc1 ft1, 0x5c(sp)
         lw t3, 0x40(sp)
         addiu a3, zero, 0x0
         sub.s ft3, ft1, ft2
         swc1 ft3, 0x5c(sp)
         lw t5, 0x0(t3)
         sw t5, 0x0(sp)
         lw a1, 0x4(t3)
         lw a0, 0x0(sp)
         sw a1, 0x4(sp)
         lw a2, 0x8(t3)
         jal mCoBG_GetBgY_OnlyCenter_FromWpos2
         sw a2, 0x8(sp)
         lui at, 0x4170
         mtc1 at, ft4
         lui at, 0x42c3
         mtc1 at, ft5
         lui at, 0x40f0
         mtc1 at, ft2
         lwc1 ft1, 0x64(sp)
         add.s ft0, fv0, ft5
         lwc1 ft5, 0x5c(sp)
         add.s ft3, ft1, ft2
         swc1 ft0, 0x60(sp)
         lwc1 ft1, 0x60(sp)
         swc1 ft3, 0x64(sp)
         lwc1 ft0, 0x28(s2)
         lwc1 ft2, 0x2c(s2)
         sub.s fv1, ft5, ft0
         lwc1 ft5, 0x30(s2)
         sub.s fa1, ft1, ft2
         mul.s ft0, fv1, fv1
         sub.s fa0, ft3, ft5
         mul.s ft1, fa0, fa0
         add.s fv0, ft0, ft1
         sqrt.s fv0, fv0
         c.lt.s fv0, ft4
         nop 
         bc1fl .L5e4377
         lw ra, 0x34(sp)
         mul.s fv0, fa1, fa1
         or a0, s2, zero
         addiu a1, zero, 0x2
         sqrt.s fv0, fv0
         c.lt.s fv0, ft4
         nop 
         bc1fl .L5e4377
         lw ra, 0x34(sp)
         jal aFSN_setupAction
         or a2, s0, zero
         b .L5e4377
         lw ra, 0x34(sp)
         lbu v0, 0x1a4(s2)
     187bnez v0, .L5cc371
         lui s0, %hi([.data]+0x158)
         addiu s0, s0, %lo([.data]+0x158)
         addiu a0, sp, 0x5c
     368jal xyz_t_move
         lw a1, 0x40(sp)
         lh t6, 0x2(s0)
         lh t7, 0x36(s2)
         addu s1, t6, t7
         sll s1, s1, 16
         sra s1, s1, 16
         sll a0, s1, 16
         jal sin_s
         sra a0, a0, 16
         lui at, 0x42a0
         mtc1 at, ft2
         lwc1 fv1, 0x5c(sp)
         sll a0, s1, 16
         mul.s ft3, fv0, ft2
         sra a0, a0, 16
         add.s fv1, fv1, ft3
         jal cos_s
         swc1 fv1, 0x5c(sp)
         lui at, 0x42a0
         mtc1 at, ft0
         lwc1 ft5, 0x64(sp)
         addiu t8, sp, 0x5c
         mul.s ft1, fv0, ft0
         add.s ft2, ft5, ft1
         swc1 ft2, 0x64(sp)
         lw t0, 0x0(t8)
         sw t0, 0x0(sp)
         lw a1, 0x4(t8)
         lw a0, 0x0(sp)
         sw a1, 0x4(sp)
         lw a2, 0x8(t8)
         jal mFI_GetUnitFG
         sw a2, 0x8(sp)
         beqz v0, .L5b8366
         addiu s0, s0, 0x4
         lhu v1, 0x0(v0)
         addiu at, zero, 0x804
         beq v1, at, .L5a4361
         addiu at, zero, 0x809
         beq v1, at, .L5a4361
         addiu at, zero, 0x811
         beq v1, at, .L5a4361
         addiu at, zero, 0x819
         beq v1, at, .L5a4361
         addiu at, zero, 0x821
         beq v1, at, .L5a4361
         addiu at, zero, 0x829
         beq v1, at, .L5a4361
         addiu at, zero, 0x80a
         beq v1, at, .L5a4361
         addiu at, zero, 0x812
         beq v1, at, .L5a4361
         addiu at, zero, 0x81a
         beq v1, at, .L5a4361
         addiu at, zero, 0x822
         beq v1, at, .L5a4361
         addiu at, zero, 0x82a
         beq v1, at, .L5a4361
         addiu at, zero, 0x80b
         beq v1, at, .L5a4361
         addiu at, zero, 0x813
         beq v1, at, .L5a4361
         addiu at, zero, 0x81b
         beq v1, at, .L5a4361
         addiu at, zero, 0x823
         beq v1, at, .L5a4361
         addiu at, zero, 0x82b
         bne v1, at, .L5b8366
     330addiu t1, zero, 0x1
         sh s1, 0x36(s2)
         sb t1, 0x1a4(s2)
         b .L5cc371
         andi v0, t1, 0xff
     326lui t2, %hi([.data]+0x164)
         addiu t2, t2, %lo([.data]+0x164)
         bnel s0, t2, .L490292
         addiu a0, sp, 0x5c
         lbu v0, 0x1a4(s2)
     288bnezl v0, .L5e4377
         lw ra, 0x34(sp)
         jal mEnv_GetWindAngleS
         nop 
         sh v0, 0x36(s2)
         lw ra, 0x34(sp)
     48lw s0, 0x28(sp)
         lw s1, 0x2c(sp)
         lw s2, 0x30(sp)
         jr ra
         addiu sp, sp, 0x78
```





# Declarations for the functions called from the target assembly

- `void mCoBG_BgCheckControll(xyz_t*, struct Actor*, f32, f32, s32, s32, s32);`
- `void mRlib_spdF_Angle_to_spdXZ(struct xyz_t* speed, f32* speedf, s16* angle);`
- `s16 mRlib_Get_HitWallAngleY(struct Actor* actor);`
- `void mRlib_Station_step_modify_to_wall(struct Actor* actor);`
- `void sAdo_OngenTrgStartSpeed(u16 num, struct xyz_t* pos, f32 speed);`
- `f32 cos_s(s16 angle);`
- `f32 sin_s(s16 angle);`

# Types definitions used in the declarations

```c
typedef float   f32;
```

```c
typedef struct xyz_t {
    /* 0x0 */ f32 x;
    /* 0x4 */ f32 y;
    /* 0x8 */ f32 z;
} xyz_t;
```

```c
typedef struct Actor {
    /* 0x000 */ s16 name;   // id
    /* 0x002 */ u8 part;    // category
    /* 0x003 */ u8 unk_003; // If set to 1 then fgdata will be restored independently of the actor's part
    /* 0x004 */ u16 unk_004;
    /* 0x006 */ u16 fgName;
    /* 0x008 */ s8 blockX;
    /* 0x009 */ s8 blockZ;
    /* 0x00A */ s16 unk_00A;
    /* 0x00C */ PosRot home;
    /* 0x020 */ u32 flags;
    /* 0x024 */ s16 params;
    /* 0x026 */ s16 unk_026; // objBankIndex
    /* 0x028 */ PosRot world;
    /* 0x03C */ xyz_t prevPos;
    /* 0x048 */ PosRot eye; // focus
    /* 0x05C */ xyz_t scale;
    /* 0x068 */ xyz_t velocity;
    /* 0x074 */ f32 speed;
    /* 0x078 */ f32 gravity;
    /* 0x07C */ f32 terminalVelocity;
    /* 0x080 */ UNK_TYPE1 unk_080[0x4];
    /* 0x084 */ mCoBG_Check colCheck;
    /* 0x0B4 */ u8 unk_0B4;
    /* 0x0B5 */ u8 isDrawn;
    /* 0x0B6 */ s16 yawTowardsPlayer;
    /* 0x0B8 */ f32 xyzDistToPlayerSq;
    /* 0x0BC */ f32 xzDistToPlayer;
    /* 0x0C0 */ f32 playerHeightRel;
    /* 0x0C4 */ CollisionCheck_Status colStatus; // made-up name
    /* 0x0DC */ Shape_Info shape;
    /* 0x124 */ xyz_t projectedPos;
    /* 0x130 */ f32 projectedW;
    /* 0x134 */ f32 uncullZoneScale;
    /* 0x138 */ f32 uncullZoneDownward;
    /* 0x13C */ f32 unk_13C;
    /* 0x140 */ f32 unk_140;
    /* 0x144 */ f32 unk_144;
    /* 0x148 */ u8 unk_148;
    /* 0x149 */ u8 unk_149;
    /* 0x14A */ UNK_TYPE1 unk_14A[0x2];
    /* 0x14C */ struct Actor* parent;
    /* 0x150 */ struct Actor* child;
    /* 0x154 */ struct Actor* prev;
    /* 0x158 */ struct Actor* next;
    /* 0x15C */ ActorFunc ct;
    /* 0x160 */ ActorFunc dt;
    /* 0x164 */ ActorFunc update;
    /* 0x168 */ ActorFunc draw;
    /* 0x16C */ ActorFunc save;
    /* 0x170 */ struct ActorOverlay* overlayEntry;
} Actor;
```

# Primary Objective

Decompile the following target assembly function from `asm/jp/nonmatchings/overlays/actors/ovl_Snowman/ac_snowman/func_8096F348_jp.s` into clean, readable C code that compiles to an assembly matching EXACTLY the original one.

```asm
glabel func_8096F348_jp
nonmatching func_8096F348_jp, 0x30C
    /* 863F88 8096F348 27BDFFB8 */  addiu       $sp, $sp, -0x48
    /* 863F8C 8096F34C AFB00028 */  sw          $s0, 0x28($sp)
    /* 863F90 8096F350 00808025 */  or          $s0, $a0, $zero
    /* 863F94 8096F354 AFBF002C */  sw          $ra, 0x2C($sp)
    /* 863F98 8096F358 AFA5004C */  sw          $a1, 0x4C($sp)
    /* 863F9C 8096F35C 3C0141A0 */  lui         $at, (0x41A00000 >> 16)
    /* 863FA0 8096F360 44813000 */  mtc1        $at, $ft1
    /* 863FA4 8096F364 C60401D0 */  lwc1        $ft0, 0x1D0($s0)
    /* 863FA8 8096F368 860E01F8 */  lh          $t6, 0x1F8($s0)
    /* 863FAC 8096F36C 3C014120 */  lui         $at, (0x41200000 >> 16)
    /* 863FB0 8096F370 46062202 */  mul.s       $ft2, $ft0, $ft1
    /* 863FB4 8096F374 44815000 */  mtc1        $at, $ft3
    /* 863FB8 8096F378 31CF0020 */  andi        $t7, $t6, 0x20
    /* 863FBC 8096F37C 15E00009 */  bnez        $t7, .L8096F3A4
    /* 863FC0 8096F380 460A4000 */   add.s      $fv0, $ft2, $ft3
    /* 863FC4 8096F384 8E020190 */  lw          $v0, 0x190($s0)
    /* 863FC8 8096F388 3C188097 */  lui         $t8, %hi(func_80971354_jp)
    /* 863FCC 8096F38C 27181354 */  addiu       $t8, $t8, %lo(func_80971354_jp)
    /* 863FD0 8096F390 13020004 */  beq         $t8, $v0, .L8096F3A4
    /* 863FD4 8096F394 3C198097 */   lui        $t9, %hi(func_80971954_jp)
    /* 863FD8 8096F398 27391954 */  addiu       $t9, $t9, %lo(func_80971954_jp)
    /* 863FDC 8096F39C 17220003 */  bne         $t9, $v0, .L8096F3AC
    /* 863FE0 8096F3A0 3C088097 */   lui        $t0, %hi(func_80970A90_jp)
  .L8096F3A4:
    /* 863FE4 8096F3A4 100000A6 */  b           .L8096F640
    /* 863FE8 8096F3A8 00001025 */   or         $v0, $zero, $zero
  .L8096F3AC:
    /* 863FEC 8096F3AC 25080A90 */  addiu       $t0, $t0, %lo(func_80970A90_jp)
    /* 863FF0 8096F3B0 15020014 */  bne         $t0, $v0, .L8096F404
    /* 863FF4 8096F3B4 260401A4 */   addiu      $a0, $s0, 0x1A4
    /* 863FF8 8096F3B8 46000407 */  neg.s       $ft4, $fv0
    /* 863FFC 8096F3BC 44060000 */  mfc1        $a2, $fv0
    /* 864000 8096F3C0 44078000 */  mfc1        $a3, $ft4
    /* 864004 8096F3C4 24090001 */  addiu       $t1, $zero, 0x1
    /* 864008 8096F3C8 AFA90014 */  sw          $t1, 0x14($sp)
    /* 86400C 8096F3CC 260401A4 */  addiu       $a0, $s0, 0x1A4
    /* 864010 8096F3D0 02002825 */  or          $a1, $s0, $zero
    /* 864014 8096F3D4 AFA00010 */  sw          $zero, 0x10($sp)
    /* 864018 8096F3D8 0C01D96B */  jal         mCoBG_BgCheckControll
    /* 86401C 8096F3DC AFA00018 */   sw         $zero, 0x18($sp)
    /* 864020 8096F3E0 C6120028 */  lwc1        $ft5, 0x28($s0)
    /* 864024 8096F3E4 C60401A4 */  lwc1        $ft0, 0x1A4($s0)
    /* 864028 8096F3E8 C6080030 */  lwc1        $ft2, 0x30($s0)
    /* 86402C 8096F3EC C60A01AC */  lwc1        $ft3, 0x1AC($s0)
    /* 864030 8096F3F0 46049180 */  add.s       $ft1, $ft5, $ft0
    /* 864034 8096F3F4 460A4400 */  add.s       $ft4, $ft2, $ft3
    /* 864038 8096F3F8 E6060028 */  swc1        $ft1, 0x28($s0)
    /* 86403C 8096F3FC 10000022 */  b           .L8096F488
    /* 864040 8096F400 E6100030 */   swc1       $ft4, 0x30($s0)
  .L8096F404:
    /* 864044 8096F404 46000487 */  neg.s       $ft5, $fv0
    /* 864048 8096F408 44060000 */  mfc1        $a2, $fv0
    /* 86404C 8096F40C 44079000 */  mfc1        $a3, $ft5
    /* 864050 8096F410 02002825 */  or          $a1, $s0, $zero
    /* 864054 8096F414 AFA00010 */  sw          $zero, 0x10($sp)
    /* 864058 8096F418 AFA00014 */  sw          $zero, 0x14($sp)
    /* 86405C 8096F41C 0C01D96B */  jal         mCoBG_BgCheckControll
    /* 864060 8096F420 AFA00018 */   sw         $zero, 0x18($sp)
    /* 864064 8096F424 0C033A3C */  jal         mRlib_Station_step_modify_to_wall
    /* 864068 8096F428 02002025 */   or         $a0, $s0, $zero
    /* 86406C 8096F42C C606002C */  lwc1        $ft1, 0x2C($s0)
    /* 864070 8096F430 C6080040 */  lwc1        $ft2, 0x40($s0)
    /* 864074 8096F434 3C014270 */  lui         $at, (0x42700000 >> 16)
    /* 864078 8096F438 44812000 */  mtc1        $at, $ft0
    /* 86407C 8096F43C 46083281 */  sub.s       $ft3, $ft1, $ft2
    /* 864080 8096F440 00001025 */  or          $v0, $zero, $zero
    /* 864084 8096F444 460A203C */  c.lt.s      $ft0, $ft3
    /* 864088 8096F448 00000000 */  nop
    /* 86408C 8096F44C 4502000F */  bc1fl       .L8096F48C
    /* 864090 8096F450 8E020098 */   lw         $v0, 0x98($s0)
    /* 864094 8096F454 860C01F8 */  lh          $t4, 0x1F8($s0)
    /* 864098 8096F458 8E0B003C */  lw          $t3, 0x3C($s0)
    /* 86409C 8096F45C 8E0A0040 */  lw          $t2, 0x40($s0)
    /* 8640A0 8096F460 358D0004 */  ori         $t5, $t4, 0x4
    /* 8640A4 8096F464 A60D01F8 */  sh          $t5, 0x1F8($s0)
    /* 8640A8 8096F468 860E01F8 */  lh          $t6, 0x1F8($s0)
    /* 8640AC 8096F46C AE0B0028 */  sw          $t3, 0x28($s0)
    /* 8640B0 8096F470 8E0B0044 */  lw          $t3, 0x44($s0)
    /* 8640B4 8096F474 35CF0002 */  ori         $t7, $t6, 0x2
    /* 8640B8 8096F478 A60F01F8 */  sh          $t7, 0x1F8($s0)
    /* 8640BC 8096F47C AE0A002C */  sw          $t2, 0x2C($s0)
    /* 8640C0 8096F480 1000006F */  b           .L8096F640
    /* 8640C4 8096F484 AE0B0030 */   sw         $t3, 0x30($s0)
  .L8096F488:
    /* 8640C8 8096F488 8E020098 */  lw          $v0, 0x98($s0)
  .L8096F48C:
    /* 8640CC 8096F48C 00021180 */  sll         $v0, $v0, 6
    /* 8640D0 8096F490 000216C2 */  srl         $v0, $v0, 27
    /* 8640D4 8096F494 30580001 */  andi        $t8, $v0, 0x1
    /* 8640D8 8096F498 53000069 */  beql        $t8, $zero, .L8096F640
    /* 8640DC 8096F49C 24020001 */   addiu      $v0, $zero, 0x1
    /* 8640E0 8096F4A0 0C033A1D */  jal         mRlib_Get_HitWallAngleY
    /* 8640E4 8096F4A4 02002025 */   or         $a0, $s0, $zero
    /* 8640E8 8096F4A8 A7A2003A */  sh          $v0, 0x3A($sp)
    /* 8640EC 8096F4AC 86190036 */  lh          $t9, 0x36($s0)
    /* 8640F0 8096F4B0 00592023 */  subu        $a0, $v0, $t9
    /* 8640F4 8096F4B4 2484C000 */  addiu       $a0, $a0, -0x4000
    /* 8640F8 8096F4B8 00042400 */  sll         $a0, $a0, 16
    /* 8640FC 8096F4BC 00042403 */  sra         $a0, $a0, 16
    /* 864100 8096F4C0 0C0266A5 */  jal         sin_s
    /* 864104 8096F4C4 A7A40038 */   sh         $a0, 0x38($sp)
    /* 864108 8096F4C8 C60C0074 */  lwc1        $fa0, 0x74($s0)
    /* 86410C 8096F4CC 44807000 */  mtc1        $zero, $fa1
    /* 864110 8096F4D0 3C0140A0 */  lui         $at, (0x40A00000 >> 16)
    /* 864114 8096F4D4 460C0082 */  mul.s       $fv1, $fv0, $fa0
    /* 864118 8096F4D8 44818000 */  mtc1        $at, $ft4
    /* 86411C 8096F4DC 87A40038 */  lh          $a0, 0x38($sp)
    /* 864120 8096F4E0 87AD003A */  lh          $t5, 0x3A($sp)
    /* 864124 8096F4E4 4602703E */  c.le.s      $fa1, $fv1
    /* 864128 8096F4E8 00000000 */  nop
    /* 86412C 8096F4EC 45020004 */  bc1fl       .L8096F500
    /* 864130 8096F4F0 46001007 */   neg.s      $fv0, $fv1
    /* 864134 8096F4F4 10000002 */  b           .L8096F500
    /* 864138 8096F4F8 46001006 */   mov.s      $fv0, $fv1
    /* 86413C 8096F4FC 46001007 */  neg.s       $fv0, $fv1
  .L8096F500:
    /* 864140 8096F500 4600803C */  c.lt.s      $ft4, $fv0
    /* 864144 8096F504 00000000 */  nop
    /* 864148 8096F508 4502000A */  bc1fl       .L8096F534
    /* 86414C 8096F50C 4602703C */   c.lt.s     $fa1, $fv1
    /* 864150 8096F510 860801F8 */  lh          $t0, 0x1F8($s0)
    /* 864154 8096F514 00001025 */  or          $v0, $zero, $zero
    /* 864158 8096F518 35090004 */  ori         $t1, $t0, 0x4
    /* 86415C 8096F51C A60901F8 */  sh          $t1, 0x1F8($s0)
    /* 864160 8096F520 860A01F8 */  lh          $t2, 0x1F8($s0)
    /* 864164 8096F524 354B0002 */  ori         $t3, $t2, 0x2
    /* 864168 8096F528 10000045 */  b           .L8096F640
    /* 86416C 8096F52C A60B01F8 */   sh         $t3, 0x1F8($s0)
    /* 864170 8096F530 4602703C */  c.lt.s      $fa1, $fv1
  .L8096F534:
    /* 864174 8096F534 860C0036 */  lh          $t4, 0x36($s0)
    /* 864178 8096F538 24018000 */  addiu       $at, $zero, -0x8000
    /* 86417C 8096F53C 018D1023 */  subu        $v0, $t4, $t5
    /* 864180 8096F540 45000029 */  bc1f        .L8096F5E8
    /* 864184 8096F544 00411021 */   addu       $v0, $v0, $at
    /* 864188 8096F548 AFA20030 */  sw          $v0, 0x30($sp)
    /* 86418C 8096F54C 0C026695 */  jal         cos_s
    /* 864190 8096F550 E7A20034 */   swc1       $fv1, 0x34($sp)
    /* 864194 8096F554 8FA20030 */  lw          $v0, 0x30($sp)
    /* 864198 8096F558 87AE003A */  lh          $t6, 0x3A($sp)
    /* 86419C 8096F55C C6120074 */  lwc1        $ft5, 0x74($s0)
    /* 8641A0 8096F560 C7A20034 */  lwc1        $fv1, 0x34($sp)
    /* 8641A4 8096F564 01C27823 */  subu        $t7, $t6, $v0
    /* 8641A8 8096F568 A60F0036 */  sh          $t7, 0x36($s0)
    /* 8641AC 8096F56C 3C018097 */  lui         $at, %hi(RO_FLT_80971D7C_jp)
    /* 8641B0 8096F570 46120302 */  mul.s       $fa0, $fv0, $ft5
    /* 8641B4 8096F574 C4261D7C */  lwc1        $ft1, %lo(RO_FLT_80971D7C_jp)($at)
    /* 8641B8 8096F578 8E190190 */  lw          $t9, 0x190($s0)
    /* 8641BC 8096F57C 3C188097 */  lui         $t8, %hi(func_80970468_jp)
    /* 8641C0 8096F580 46061082 */  mul.s       $fv1, $fv1, $ft1
    /* 8641C4 8096F584 27180468 */  addiu       $t8, $t8, %lo(func_80970468_jp)
    /* 8641C8 8096F588 46021202 */  mul.s       $ft2, $fv1, $fv1
    /* 8641CC 8096F58C 00000000 */  nop
    /* 8641D0 8096F590 460C6102 */  mul.s       $ft0, $fa0, $fa0
    /* 8641D4 8096F594 46044000 */  add.s       $fv0, $ft2, $ft0
    /* 8641D8 8096F598 46000004 */  sqrt.s      $fv0, $fv0
    /* 8641DC 8096F59C 13190023 */  beq         $t8, $t9, .L8096F62C
    /* 8641E0 8096F5A0 E6000074 */   swc1       $fv0, 0x74($s0)
    /* 8641E4 8096F5A4 8E080098 */  lw          $t0, 0x98($s0)
    /* 8641E8 8096F5A8 3C013F00 */  lui         $at, (0x3F000000 >> 16)
    /* 8641EC 8096F5AC 00085580 */  sll         $t2, $t0, 22
    /* 8641F0 8096F5B0 0542001F */  bltzl       $t2, .L8096F630
    /* 8641F4 8096F5B4 26040068 */   addiu      $a0, $s0, 0x68
    /* 8641F8 8096F5B8 C60C0074 */  lwc1        $fa0, 0x74($s0)
    /* 8641FC 8096F5BC 44815000 */  mtc1        $at, $ft3
    /* 864200 8096F5C0 24040103 */  addiu       $a0, $zero, 0x103
    /* 864204 8096F5C4 460C503C */  c.lt.s      $ft3, $fa0
    /* 864208 8096F5C8 00000000 */  nop
    /* 86420C 8096F5CC 45020018 */  bc1fl       .L8096F630
    /* 864210 8096F5D0 26040068 */   addiu      $a0, $s0, 0x68
    /* 864214 8096F5D4 44066000 */  mfc1        $a2, $fa0
    /* 864218 8096F5D8 0C03488D */  jal         sAdo_OngenTrgStartSpeed
    /* 86421C 8096F5DC 26050028 */   addiu      $a1, $s0, 0x28
    /* 864220 8096F5E0 10000013 */  b           .L8096F630
    /* 864224 8096F5E4 26040068 */   addiu      $a0, $s0, 0x68
  .L8096F5E8:
    /* 864228 8096F5E8 8E0C0190 */  lw          $t4, 0x190($s0)
    /* 86422C 8096F5EC 3C0B8097 */  lui         $t3, %hi(func_80970DA4_jp)
    /* 864230 8096F5F0 256B0DA4 */  addiu       $t3, $t3, %lo(func_80970DA4_jp)
    /* 864234 8096F5F4 156C000D */  bne         $t3, $t4, .L8096F62C
    /* 864238 8096F5F8 24040103 */   addiu      $a0, $zero, 0x103
    /* 86423C 8096F5FC 44066000 */  mfc1        $a2, $fa0
    /* 864240 8096F600 0C03488D */  jal         sAdo_OngenTrgStartSpeed
    /* 864244 8096F604 26050028 */   addiu      $a1, $s0, 0x28
    /* 864248 8096F608 87AD003A */  lh          $t5, 0x3A($sp)
    /* 86424C 8096F60C 3C018097 */  lui         $at, %hi(RO_FLT_80971D80_jp)
    /* 864250 8096F610 C6100074 */  lwc1        $ft4, 0x74($s0)
    /* 864254 8096F614 A60D0036 */  sh          $t5, 0x36($s0)
    /* 864258 8096F618 C4321D80 */  lwc1        $ft5, %lo(RO_FLT_80971D80_jp)($at)
    /* 86425C 8096F61C 44807000 */  mtc1        $zero, $fa1
    /* 864260 8096F620 46128182 */  mul.s       $ft1, $ft4, $ft5
    /* 864264 8096F624 E60E006C */  swc1        $fa1, 0x6C($s0)
    /* 864268 8096F628 E6060074 */  swc1        $ft1, 0x74($s0)
  .L8096F62C:
    /* 86426C 8096F62C 26040068 */  addiu       $a0, $s0, 0x68
  .L8096F630:
    /* 864270 8096F630 26050074 */  addiu       $a1, $s0, 0x74
    /* 864274 8096F634 0C03393D */  jal         mRlib_spdF_Angle_to_spdXZ
    /* 864278 8096F638 26060036 */   addiu      $a2, $s0, 0x36
    /* 86427C 8096F63C 24020001 */  addiu       $v0, $zero, 0x1
  .L8096F640:
    /* 864280 8096F640 8FBF002C */  lw          $ra, 0x2C($sp)
    /* 864284 8096F644 8FB00028 */  lw          $s0, 0x28($sp)
    /* 864288 8096F648 27BD0048 */  addiu       $sp, $sp, 0x48
    /* 86428C 8096F64C 03E00008 */  jr          $ra
    /* 864290 8096F650 00000000 */   nop
endlabel func_8096F348_jp
```

# Rules

- In order to decompile this function, you may need to create new types. Include them on the result.

- SHOW THE ENTIRE CODE WITHOUT CROPPING.
