You are decompiling an assembly function called `aBGY_actor_ct` in MIPS from a Nintendo 64 game.

# Examples

## `aTOU_actor_ct`

```c
void aTOU_actor_ct(Actor* thisx, Game_Play* game_play UNUSED) {
    Toudai* this = THIS;
    static BaseSkeletonR* skl[] = { &cKF_bs_r_obj_s_toudai, &cKF_bs_r_obj_w_toudai };
    s32 type = (common_data.time.season == WINTER);

    SegmentBaseAddress[6] = OS_K0_TO_PHYSICAL(common_data.clip.structureClip->getObjectSegment(STRUCTURE_TYPE_TOUDAI));
    cKF_SkeletonInfo_R_ct(&this->structureActor.skeletonInfo, skl[type], NULL, this->structureActor.jointTable,
                          this->structureActor.morphTable);
    aTOU_set_bgOffset(this, 1);
    aTOU_setup_action(this, 0);
    cKF_SkeletonInfo_R_play(&this->structureActor.skeletonInfo);
    this->structureActor.actor.world.pos.x -= 20.0f;
    this->structureActor.actor.world.pos.z -= 20.0f;
}
```

```asm
         addiu sp, sp, -0x38
         sw s0, 0x20(sp)
         lui v0, %hi(common_data+0x10000)
         addiu v0, v0, %lo(common_data+0x10000)
         or s0, a0, zero
         sw ra, 0x24(sp)
         sw a1, 0x3c(sp)
         lw t6, 0x10c(v0)
         lw t8, 0x98(v0)
         addiu a0, zero, 0x2d
         xori t7, t6, 0x3
         sltiu t7, t7, 0x1
         sw t7, 0x30(sp)
         lw t9, 0xac(t8)
         jalr t9
         nop 
         lw t1, 0x30(sp)
         lui at, 0x8000
         addu t0, v0, at
         lui a1, %hi([.data]+0x4c)
         sll t2, t1, 2
         lui at, %hi(SegmentBaseAddress+0x18)
         addu a1, a1, t2
         addiu a0, s0, 0x178
         addiu t3, s0, 0x246
         sw t0, %lo(SegmentBaseAddress+0x18)(at)
         sw t3, 0x10(sp)
         sw a0, 0x2c(sp)
         lw a1, %lo([.data]+0x4c)(a1)
         or a2, zero, zero
         jal cKF_SkeletonInfo_R_ct
         addiu a3, s0, 0x1ec
         or a0, s0, zero
         jal aTOU_set_bgOffset
         addiu a1, zero, 0x1
         or a0, s0, zero
         jal aTOU_setup_action
         or a1, zero, zero
         jal cKF_SkeletonInfo_R_play
         lw a0, 0x2c(sp)
         lui at, 0x41a0
         mtc1 at, fv0
         lwc1 ft0, 0x28(s0)
         lwc1 ft2, 0x30(s0)
         sub.s ft1, ft0, fv0
         sub.s ft3, ft2, fv0
         swc1 ft1, 0x28(s0)
         swc1 ft3, 0x30(s0)
         lw ra, 0x24(sp)
         lw s0, 0x20(sp)
         jr ra
         addiu sp, sp, 0x38
```

## `aFSN_actor_move`

```c
void aFSN_actor_move(Actor* thisx, Game_Play* game_play) {
    Fuusen* this = THIS;
    UNUSED UNK_TYPE1 pad[0x8];

    func_80AADF10_jp(this, game_play);
    if (this->birthTimer == 0) {
        Actor_position_moveF(&this->actor);
    } else if (this->birthTimer > 0) {
        this->birthTimer--;
    }
    if (fuusen_DEBUG_mode_flag != 0) {
        Player* player = get_player_actor_withoutCheck(game_play);
        Debug_Display_new((sin_s(this->actor.yawTowardsPlayer + 0x8000) * 30.0f) + player->actor.world.pos.x,
                          player->actor.world.pos.y + 60.0f,
                          (cos_s(this->actor.yawTowardsPlayer + 0x8000) * 30.0f) + player->actor.world.pos.z, 0,
                          this->actor.yawTowardsPlayer + 0x8000, 0, 1.0f, 1.0f, 1.0f, 250, 100, 120, 128, 4,
                          game_play->state.gfxCtx);
    }
    cKF_SkeletonInfo_R_play(&this->skeletonInfo);
    this->process(&this->actor, game_play);
    fuusen_DEBUG_mode_flag = 0;
}
```

```asm
         addiu sp, sp, -0x68
         sw s0, 0x48(sp)
         or s0, a0, zero
         sw ra, 0x4c(sp)
         sw a1, 0x6c(sp)
         or a0, s0, zero
         jal func_80AADF10_jp
         lw a1, 0x6c(sp)
         lw v0, 0x188(s0)
         bnez v0, .L3c15
         nop 
         jal Actor_position_moveF
         or a0, s0, zero
         b .L4818
         nop 
     9blez v0, .L4818
         addiu t6, v0, -0x1
         sw t6, 0x188(s0)
     13lui t7, %hi(fuusen_DEBUG_mode_flag)
         lw t7, %lo(fuusen_DEBUG_mode_flag)(t7)
         beqz t7, .L13878
         nop 
         jal get_player_actor_withoutCheck
         lw a0, 0x6c(sp)
         lh a0, 0xb6(s0)
         ori at, zero, 0x8000
         sw v0, 0x58(sp)
         addu a0, a0, at
         sll a0, a0, 16
         jal sin_s
         sra a0, a0, 16
         swc1 fv0, 0x50(sp)
         lh a0, 0xb6(s0)
         ori at, zero, 0x8000
         addu a0, a0, at
         sll a0, a0, 16
         jal cos_s
         sra a0, a0, 16
         lui at, 0x3f80
         mtc1 at, fv1
         lui at, 0x41f0
         mtc1 at, ft4
         lwc1 ft0, 0x50(sp)
         lw v1, 0x58(sp)
         lh t8, 0xb6(s0)
         mul.s ft1, ft0, ft4
         lwc1 ft2, 0x28(v1)
         lwc1 ft3, 0x2c(v1)
         mul.s ft0, fv0, ft4
         lui at, 0x4270
         mtc1 at, ft5
         lw t5, 0x6c(sp)
         ori at, zero, 0x8000
         add.s fa0, ft1, ft2
         lwc1 ft1, 0x30(v1)
         addiu t0, zero, 0xfa
         addiu t1, zero, 0x64
         add.s ft2, ft0, ft1
         addiu t2, zero, 0x78
         addiu t3, zero, 0x80
         addiu t4, zero, 0x4
         addu t9, t8, at
         sw t9, 0x10(sp)
         sw t4, 0x34(sp)
         sw t3, 0x30(sp)
         sw t2, 0x2c(sp)
         sw t1, 0x28(sp)
         sw t0, 0x24(sp)
         sw zero, 0x14(sp)
         swc1 fv1, 0x20(sp)
         swc1 fv1, 0x1c(sp)
         swc1 fv1, 0x18(sp)
         lw t6, 0x0(t5)
         mfc1 a2, ft2
         or a3, zero, zero
         add.s fa1, ft3, ft5
         jal Debug_Display_new
         sw t6, 0x38(sp)
     20jal cKF_SkeletonInfo_R_play
         addiu a0, s0, 0x1a8
         lw t9, 0x174(s0)
         or a0, s0, zero
         lw a1, 0x6c(sp)
         jalr t9
         nop 
         lui at, %hi(fuusen_DEBUG_mode_flag)
         sw zero, %lo(fuusen_DEBUG_mode_flag)(at)
         lw ra, 0x4c(sp)
         lw s0, 0x48(sp)
         addiu sp, sp, 0x68
         jr ra
         nop 
```

## `aKOI_actor_move`

```c
void aKOI_actor_move(Actor* thisx, Game_Play* game_play) {
    Koinobori* this = THIS;
    UNUSED s32 pad;
    Player* player = get_player_actor_withoutCheck(game_play);
    s32 blockX;
    s32 blockZ;
    s32 playerBlockX;
    s32 playerBlockZ;
    UNUSED s32 pad2;

    mFI_Wpos2BlockNum(&blockX, &blockZ, this->structureActor.actor.world.pos);
    mFI_Wpos2BlockNum(&playerBlockX, &playerBlockZ, player->actor.world.pos);

    if ((mDemo_Check(1, &player->actor) == 0) && (mDemo_Check(5, &player->actor) == 0) &&
        ((blockX != playerBlockX) || (blockZ != playerBlockZ))) {
        Actor_delete(&this->structureActor.actor);
        return;
    }

    SegmentBaseAddress[6] =
        OS_K0_TO_PHYSICAL(common_data.clip.structureClip->getObjectSegment(STRUCTURE_TYPE_KOINOBORI));
    cKF_SkeletonInfo_R_play(&this->structureActor.skeletonInfo);
    ((KoinoboriActionFunc)this->structureActor.process)(this, game_play);
    sAdo_OngenPos((uintptr_t)this, 0x35, &this->structureActor.actor.world.pos);
}
```

```asm
         addiu sp, sp, -0x50
         sw s0, 0x20(sp)
         or s0, a0, zero
         sw ra, 0x24(sp)
         sw a1, 0x54(sp)
         jal get_player_actor_withoutCheck
         lw a0, 0x54(sp)
         sw v0, 0x44(sp)
         addiu v1, s0, 0x28
         lw t7, 0x0(v1)
         addiu a0, sp, 0x40
         addiu a1, sp, 0x3c
         sw t7, 0x8(sp)
         lw a3, 0x4(v1)
         lw a2, 0x8(sp)
         sw a3, 0xc(sp)
         lw t7, 0x8(v1)
         sw v1, 0x2c(sp)
         jal mFI_Wpos2BlockNum
         sw t7, 0x10(sp)
         lw t8, 0x44(sp)
         addiu a0, sp, 0x38
         addiu a1, sp, 0x34
         lw t0, 0x28(t8)
         sw t0, 0x8(sp)
         lw a3, 0x2c(t8)
         lw a2, 0x8(sp)
         sw a3, 0xc(sp)
         lw t0, 0x30(t8)
         jal mFI_Wpos2BlockNum
         sw t0, 0x10(sp)
         addiu a0, zero, 0x1
         jal mDemo_Check
         lw a1, 0x44(sp)
         bnez v0, .Lcc51
         addiu a0, zero, 0x5
         jal mDemo_Check
         lw a1, 0x44(sp)
         bnez v0, .Lcc51
         lw t1, 0x40(sp)
         lw t2, 0x38(sp)
         lw t3, 0x3c(sp)
         lw t4, 0x34(sp)
         bne t1, t2, .Lbc47
         nop 
         beq t3, t4, .Lcc51
         nop 
     43jal Actor_delete
         or a0, s0, zero
         b .L12473
         lw ra, 0x24(sp)
     34lui t5, %hi(common_data+0x10098)
         lw t5, %lo(common_data+0x10098)(t5)
         addiu a0, zero, 0x27
         lw t9, 0xac(t5)
         jalr t9
         nop 
         lui at, 0x8000
         addu t6, v0, at
         lui at, %hi(SegmentBaseAddress+0x18)
         sw t6, %lo(SegmentBaseAddress+0x18)(at)
         jal cKF_SkeletonInfo_R_play
         addiu a0, s0, 0x178
         lw t9, 0x2a0(s0)
         or a0, s0, zero
         lw a1, 0x54(sp)
         jalr t9
         nop 
         or a0, s0, zero
         addiu a1, zero, 0x35
         jal sAdo_OngenPos
         lw a2, 0x2c(sp)
         lw ra, 0x24(sp)
     49lw s0, 0x20(sp)
         addiu sp, sp, 0x50
         jr ra
         nop 
```

## `aTRD_actor_ct`

```c
void aTRD_actor_ct(Actor* thisx, UNUSED Game_Play* game_play) {
    TrainDoor* this = (TrainDoor*)thisx;

    cKF_SkeletonInfo_R_ct(&this->skeletonInfo, &cKF_bs_r_obj_romtrain_door, NULL, this->work, this->target);
    cKF_SkeletonInfo_R_init(&this->skeletonInfo, this->skeletonInfo.skeleton, &cKF_ba_r_obj_romtrain_door, 1.0f, 51.0f,
                            1.0f, 0.0f, 0.0f, 0, NULL);
    this->skeletonInfo.morphCounter = 0.0f;
    cKF_SkeletonInfo_R_play(&this->skeletonInfo);
}
```

```asm
         addiu sp, sp, -0x40
         sw s0, 0x30(sp)
         or s0, a0, zero
         sw ra, 0x34(sp)
         sw a1, 0x44(sp)
         addiu a0, s0, 0x17c
         lui a1, %hi(cKF_bs_r_obj_romtrain_door)
         addiu t6, s0, 0x228
         sw t6, 0x10(sp)
         addiu a1, a1, %lo(cKF_bs_r_obj_romtrain_door)
         sw a0, 0x38(sp)
         or a2, zero, zero
         jal cKF_SkeletonInfo_R_ct
         addiu a3, s0, 0x210
         lui at, 0x3f80
         mtc1 at, fv0
         lw a1, 0x194(s0)
         mtc1 zero, fv1
         lui at, 0x424c
         mtc1 at, ft0
         lui a2, %hi(cKF_ba_r_obj_romtrain_door)
         mfc1 a3, fv0
         addiu a2, a2, %lo(cKF_ba_r_obj_romtrain_door)
         sw zero, 0x24(sp)
         sw zero, 0x20(sp)
         lw a0, 0x38(sp)
         swc1 fv0, 0x14(sp)
         swc1 fv1, 0x18(sp)
         swc1 fv1, 0x1c(sp)
         jal cKF_SkeletonInfo_R_init
         swc1 ft0, 0x10(sp)
         mtc1 zero, ft1
         nop 
         swc1 ft1, 0x19c(s0)
         jal cKF_SkeletonInfo_R_play
         lw a0, 0x38(sp)
         lw ra, 0x34(sp)
         lw s0, 0x30(sp)
         addiu sp, sp, 0x40
         jr ra
         nop 
```

## `aBEE_actor_ct`

```c
void aBEE_actor_ct(Actor* thisx, Game_Play* game_play) {
    Bee* this = THIS;
    SkeletonInfoR* skeletonInfo = &this->skeletonInfo;
    // Name Based on ac_fuusen
    xyz_t InitSize = { 0.0f, 0.0f, 0.0f };

    cKF_SkeletonInfo_R_ct(&this->skeletonInfo, &cKF_bs_r_act_bee, &cKF_ba_r_act_bee, this->jointTable,
                          this->morphTable);
    cKF_SkeletonInfo_R_init_standard_repeat(&this->skeletonInfo, Lib_SegmentedToVirtual(&cKF_ba_r_act_bee), 0);
    skeletonInfo->frameControl.currentFrame = 90.0f;
    cKF_SkeletonInfo_R_play(skeletonInfo);
    skeletonInfo->frameControl.speed = 0.0f;
    this->texScrollCounter2 = -0x8000;
    this->shapeFactor = 90.0f;
    xyz_t_move(&this->actor.scale, &InitSize);
    this->segment = game_play->objectExchangeBank.status[this->actor.unk_026].segment;
    this->actor.update = aBEE_actor_move;
    aBEE_setupAction(this, BEE_PROCESS_APPEAR, game_play);
}
```

```asm
         addiu sp, sp, -0x48
         sw s0, 0x1c(sp)
         or s0, a0, zero
         sw ra, 0x24(sp)
         sw s1, 0x20(sp)
         sw a1, 0x4c(sp)
         lui t7, %hi([.data]+0x24)
         addiu t7, t7, %lo([.data]+0x24)
         lw t9, 0x0(t7)
         addiu t6, sp, 0x34
         lw t8, 0x4(t7)
         sw t9, 0x0(t6)
         lw t9, 0x8(t7)
         addiu s1, s0, 0x180
         lui a1, %hi(cKF_bs_r_act_bee)
         lui a2, %hi(cKF_ba_r_act_bee)
         addiu t0, s0, 0x208
         sw t8, 0x4(t6)
         sw t9, 0x8(t6)
         sw t0, 0x10(sp)
         addiu a2, a2, %lo(cKF_ba_r_act_bee)
         addiu a1, a1, %lo(cKF_bs_r_act_bee)
         or a0, s1, zero
         jal cKF_SkeletonInfo_R_ct
         addiu a3, s0, 0x1f0
         lui a0, %hi(cKF_ba_r_act_bee)
         jal Lib_SegmentedToVirtual
         addiu a0, a0, %lo(cKF_ba_r_act_bee)
         or a0, s1, zero
         or a1, v0, zero
         jal cKF_SkeletonInfo_R_init_standard_repeat
         or a2, zero, zero
         lui at, 0x42b4
         mtc1 at, ft0
         or a0, s1, zero
         jal cKF_SkeletonInfo_R_play
         swc1 ft0, 0x10(s1)
         mtc1 zero, ft1
         lui at, 0x42b4
         mtc1 at, ft2
         addiu t1, zero, -0x8000
         swc1 ft1, 0xc(s1)
         sh t1, 0x442(s0)
         addiu a0, s0, 0x5c
         addiu a1, sp, 0x34
         jal xyz_t_move
         swc1 ft2, 0x430(s0)
         lh t2, 0x26(s0)
         lw a2, 0x4c(sp)
         lui t6, %hi(aBEE_actor_move)
         sll t3, t2, 2
         addu t3, t3, t2
         sll t3, t3, 2
         addu t3, t3, t2
         sll t3, t3, 2
         addu t4, a2, t3
         lw t5, 0x114(t4)
         addiu t6, t6, %lo(aBEE_actor_move)
         sw t6, 0x164(s0)
         or a0, s0, zero
         or a1, zero, zero
         jal aBEE_setupAction
         sw t5, 0x178(s0)
         lw ra, 0x24(sp)
         lw s0, 0x1c(sp)
         lw s1, 0x20(sp)
         jr ra
         addiu sp, sp, 0x48
```



# Function declaration for the target assembly

`void aBGY_actor_ct(Actor* thisx, Game_Play* game_play);`

# Declarations for the functions called from the target assembly

- `void cKF_SkeletonInfo_R_ct(SkeletonInfoR* skeletonInfo, BaseSkeletonR* skeleton, BaseAnimationR* animation,
                           s_xyz* jointTable, s_xyz* morphTable);`
- `s32 cKF_SkeletonInfo_R_play(SkeletonInfoR* skeletonInfo);`
- `struct Player* get_player_actor_withoutCheck(struct Game_Play* game_play);`

# Types definitions used in the declarations

```c
typedef struct Game_Play {
    /* 0x0000 */ Game state;
    /* 0x00E0 */ s16 unk_00E0;
    /* 0x00E2 */ UNK_TYPE1 unk_00E2[0x2];
    /* 0x00E4 */ s8 unk_00E4;
    /* 0x00E5 */ s8 unk_00E5;
    /* 0x00E6 */ UNK_TYPE1 unk_00E6[0x2];
    /* 0x00E8 */ UNK_TYPE1 unk_00E8[0x24];
    /* 0x010C */ void* unk_010C;
    /* 0x0110 */ ObjectExchangeBank objectExchangeBank;
    /* 0x1938 */ View view;
    /* 0x1A60 */ Camera2 camera;
    /* 0x1B98 */ Kankyo kankyo;
    /* 0x1C60 */ Global_light glight;
    /* 0x1C70 */ Pause pause;
    /* 0x1C78 */ ActorInfo actorInfo;
    /* 0x1CBC */ Submenu submenu;
    /* 0x1DAC */ s8 unk_1DAC;
    /* 0x1DAD */ UNK_TYPE1 unk_1DAD[0x3];
    /* 0x1DB0 */ u8* groundTexPtrs[2];
    /* 0x1DB8 */ u8* groundPalPtrs[2];
    /* 0x1DC0 */ PreRender unk_1DC0;
    /* 0x1E10 */ DoorInfo sceneDoorInfo;
    /* 0x1E18 */ s32 unk_1E18;
    /* 0x1E1C */ MtxF viewProjectionMtxF;
    /* 0x1E5C */ MtxF billboardMtxF;
    /* 0x1E9C */ Mtx* unk_1E9C;
    /* 0x1EA0 */ u32 unk_1EA0;
    /* 0x1EA4 */ UNK_TYPE1 unk_1EA4[0x1];
    /* 0x1EA5 */ u8 unk_1EA5;
    /* 0x1EA6 */ u8 unk_1EA6;
    /* 0x1EA7 */ u8 unk_1EA7;
    /* 0x1EA8 */ struct ActorEntry* unk_1EA8;
    /* 0x1EAC */ struct ActorEntry* unk_1EAC;
    /* 0x1EB0 */ s16* unk_1EB0;
    /* 0x1EB4 */ s16* unk_1EB4;
    /* 0x1EB8 */ s32 unk_1EB8;
    /* 0x1EBC */ Event event;
    /* 0x1ECC */ UNK_TYPE1 unk_1ECC[0x14];
    /* 0x1EE0 */ u8 unk_1EE0;
    /* 0x1EE1 */ u8 unk_1EE1;
    /* 0x1EE2 */ u8 unk_1EE2;
    /* 0x1EE3 */ u8 unk_1EE3;
    /* 0x1EE4 */ UNK_TYPE1 unk_1EE4[0x4];
    /* 0x1EE8 */ Game_Play_Unk_1EE8 unk_1EE8;
    /* 0x2128 */ fbDemoFade unk_2128;
    /* 0x2138 */ CollisionCheck unk_2138;
    /* 0x2208 */ Game_Play_unk_2208 unk_2208;
    /* 0x220C */ s32 unk_220C;
    /* 0x2210 */ struct SceneDmaStatus* unk_2210;
    /* 0x2214 */ UNK_TYPE1 unk_2214[0x1FC];
} Game_Play;
```

```c
typedef struct Player {
    /* 0x0000 */ Actor actor;
    /* 0x0174 */ SkeletonInfoR skeletonInfo0;
    /* 0x01E4 */ UNK_TYPE1 unk_01E4[0xB0C];
    /* 0x0CF0*/  s32 nowMainIndex;
    /* 0x0CF4*/  s32 unk_0CF4;
    /* 0x0CF8 */ UNK_TYPE1 unk_0CF8[0x8];
    /* 0x0D00 */ s32 unk_0D00;
    /* 0x0D04 */ s32 unk_0D04;
    /* 0x0D08 */ s32 unk_0D08;
    /* 0x0D0C */ UNK_TYPE1 unk_0D0C[0x4];
    /* 0x0D10 */ Player_MainIndexData mainIndexData;
    /* 0x0D58 */ UNK_TYPE1 unk_0D58[0x54];
    /* 0x0DAC */ UNK_TYPE unk_0DAC;
    /* 0x0DB0 */ UNK_TYPE unk_0DB0;
    /* 0x0DB4 */ UNK_TYPE1 unk_0DB4[0x8];
    /* 0x0DBC */ u8* unk_0DBC[2];
    /* 0x0DC4 */ UNK_TYPE1 unk_0DC4[0x18];
    /* 0x0DDC */ UNK_TYPE unk_0DDC[2];
    /* 0x0DE4 */ UNK_TYPE unk_0DE4[2];
    /* 0x0DEC */ UNK_TYPE1 unk_0DEC[0x44];
    /* 0x0E30 */ xyz_t netPos;
    /* 0x0E3C */ UNK_TYPE1 unk_0E3C[0xEC];
    /* 0x0F28 */ Actor* fishingRodActor;
    /* 0x0F2C */ UNK_TYPE1 unk_0F2C[0x20];
    /* 0x0F4C */ ClObjTris colliderTris1;
    /* 0x0F60 */ UNK_TYPE1 unk_0F60[0x44];
    /* 0x0FA4 */ ClObjTris colliderTris2;
    /* 0x0FB8 */ UNK_TYPE1 unk_0FB8[0x50];
    /* 0x1008 */ ClObjPipe colliderPipe;
    /* 0x1024 */ UNK_TYPE1 unk_1024[0x208];
    /* 0x122C */ PlayerUnk122CFunc unk_122C;
    /* 0x1230 */ PlayerUnk1230Func unk_1230;
    /* 0x1234 */ PlayerUnk1234Func unk_1234;
    /* 0x1238 */ PlayerUnk1238Func unk_1238;
    /* 0x123C */ UNK_TYPE1 unk_123C[0x8];
    /* 0x1244 */ SetMgrGetEndPosProc getEndPos;
    /* 0x1248 */ UNK_TYPE1 unk_1248[0x70];
    /* 0x12B8 */ s32 pressedAButton;
    /* 0x12BC */ s32 unk_12BC;
    /* 0x12C0 */ u16 itemInFront;
    /* 0x12C2 */ UNK_TYPE1 unk_12C2[0x2];
    /* 0x12C4 */ xyz_t forwardUtPos;
    /* 0x12D0 */ s8 updateSceneBGMode;
    /* 0x12D1 */ UNK_TYPE1 unk_12D4[0x7];
} Player;
```

```c
typedef struct BaseSkeletonR {
    /* 0x00 */ u8 numberOfJoints;
    /* 0x01 */ u8 unk01;
    /* 0x04 */ JointElemR* jointElemTable;
} BaseSkeletonR;
```

```c
typedef struct BaseAnimationR {
    /* 0x00 */ u8* constKeyCheckBitTable;
    /* 0x04 */ Keyframe* dataSource;
    /* 0x08 */ s16* keyframeNumber;
    /* 0x0C */ s16* constValueTable;
    /* 0x10 */ s16 unk10;
    /* 0x12 */ s16 duration;
} BaseAnimationR;
```

```c
typedef struct SkeletonInfoR {
    /* 0x00 */ FrameControl frameControl;
    /* 0x18 */ BaseSkeletonR* skeleton;
    /* 0x1C */ BaseAnimationR* animation;
    /* 0x20 */ f32 morphCounter;
    /* 0x24 */ s_xyz* jointTable;
    /* 0x28 */ s_xyz* morphTable;
    /* 0x2C */ s_xyz* diffRotTable;
    /* 0x30 */ AnimationMove animationMove;
} SkeletonInfoR;
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

```c
typedef struct s_xyz {
    /* 0x0 */ s16 x;
    /* 0x2 */ s16 y;
    /* 0x4 */ s16 z;
} s_xyz;
```

# Primary Objective

Decompile the following target assembly function from `asm/jp/nonmatchings/overlays/actors/ovl_Buggy/ac_buggy/aBGY_actor_ct.s` into clean, readable C code that compiles to an assembly matching EXACTLY the original one.

```asm
glabel aBGY_actor_ct
nonmatching aBGY_actor_ct, 0x138
    /* 8CE890 809FFBC0 27BDFFB0 */  addiu       $sp, $sp, -0x50
    /* 8CE894 809FFBC4 AFB00020 */  sw          $s0, 0x20($sp)
    /* 8CE898 809FFBC8 00808025 */  or          $s0, $a0, $zero
    /* 8CE89C 809FFBCC AFBF0024 */  sw          $ra, 0x24($sp)
    /* 8CE8A0 809FFBD0 0C02C721 */  jal         get_player_actor_withoutCheck
    /* 8CE8A4 809FFBD4 00A02025 */   or         $a0, $a1, $zero
    /* 8CE8A8 809FFBD8 3C038013 */  lui         $v1, %hi(common_data + 0x10000)
    /* 8CE8AC 809FFBDC 24636EA0 */  addiu       $v1, $v1, %lo(common_data + 0x10000)
    /* 8CE8B0 809FFBE0 8C6E010C */  lw          $t6, 0x10C($v1)
    /* 8CE8B4 809FFBE4 8C780098 */  lw          $t8, 0x98($v1)
    /* 8CE8B8 809FFBE8 AFA20044 */  sw          $v0, 0x44($sp)
    /* 8CE8BC 809FFBEC 39CF0003 */  xori        $t7, $t6, 0x3
    /* 8CE8C0 809FFBF0 2DEF0001 */  sltiu       $t7, $t7, 0x1
    /* 8CE8C4 809FFBF4 AFAF0040 */  sw          $t7, 0x40($sp)
    /* 8CE8C8 809FFBF8 8F1900AC */  lw          $t9, 0xAC($t8)
    /* 8CE8CC 809FFBFC 24040018 */  addiu       $a0, $zero, 0x18
    /* 8CE8D0 809FFC00 0320F809 */  jalr        $t9
    /* 8CE8D4 809FFC04 00000000 */   nop
    /* 8CE8D8 809FFC08 8FA90040 */  lw          $t1, 0x40($sp)
    /* 8CE8DC 809FFC0C 3C018000 */  lui         $at, (0x80000000 >> 16)
    /* 8CE8E0 809FFC10 00414021 */  addu        $t0, $v0, $at
    /* 8CE8E4 809FFC14 3C0580A0 */  lui         $a1, %hi(D_80A00C78_jp)
    /* 8CE8E8 809FFC18 00095080 */  sll         $t2, $t1, 2
    /* 8CE8EC 809FFC1C 3C018014 */  lui         $at, %hi(SegmentBaseAddress + 0x18)
    /* 8CE8F0 809FFC20 00AA2821 */  addu        $a1, $a1, $t2
    /* 8CE8F4 809FFC24 26040178 */  addiu       $a0, $s0, 0x178
    /* 8CE8F8 809FFC28 260B0246 */  addiu       $t3, $s0, 0x246
    /* 8CE8FC 809FFC2C AC2858B8 */  sw          $t0, %lo(SegmentBaseAddress + 0x18)($at)
    /* 8CE900 809FFC30 AFAB0010 */  sw          $t3, 0x10($sp)
    /* 8CE904 809FFC34 AFA4002C */  sw          $a0, 0x2C($sp)
    /* 8CE908 809FFC38 8CA50C78 */  lw          $a1, %lo(D_80A00C78_jp)($a1)
    /* 8CE90C 809FFC3C 00003025 */  or          $a2, $zero, $zero
    /* 8CE910 809FFC40 0C01488A */  jal         cKF_SkeletonInfo_R_ct
    /* 8CE914 809FFC44 260701EC */   addiu      $a3, $s0, 0x1EC
    /* 8CE918 809FFC48 02002025 */  or          $a0, $s0, $zero
    /* 8CE91C 809FFC4C 0C27FFE4 */  jal         func_809FFF90_jp
    /* 8CE920 809FFC50 24050001 */   addiu      $a1, $zero, 0x1
    /* 8CE924 809FFC54 02002025 */  or          $a0, $s0, $zero
    /* 8CE928 809FFC58 0C27FF6A */  jal         func_809FFDA8_jp
    /* 8CE92C 809FFC5C 24050001 */   addiu      $a1, $zero, 0x1
    /* 8CE930 809FFC60 0C01F55E */  jal         func_8007D578_jp
    /* 8CE934 809FFC64 00000000 */   nop
    /* 8CE938 809FFC68 C6040028 */  lwc1        $ft0, 0x28($s0)
    /* 8CE93C 809FFC6C 8FA40044 */  lw          $a0, 0x44($sp)
    /* 8CE940 809FFC70 3C0142C8 */  lui         $at, (0x42C80000 >> 16)
    /* 8CE944 809FFC74 4600218D */  trunc.w.s   $ft1, $ft0
    /* 8CE948 809FFC78 44815000 */  mtc1        $at, $ft3
    /* 8CE94C 809FFC7C C6080030 */  lwc1        $ft2, 0x30($s0)
    /* 8CE950 809FFC80 C4840028 */  lwc1        $ft0, 0x28($a0)
    /* 8CE954 809FFC84 44023000 */  mfc1        $v0, $ft1
    /* 8CE958 809FFC88 460A4400 */  add.s       $ft4, $ft2, $ft3
    /* 8CE95C 809FFC8C 00002825 */  or          $a1, $zero, $zero
    /* 8CE960 809FFC90 4600218D */  trunc.w.s   $ft1, $ft0
    /* 8CE964 809FFC94 4600848D */  trunc.w.s   $ft5, $ft4
    /* 8CE968 809FFC98 440F3000 */  mfc1        $t7, $ft1
    /* 8CE96C 809FFC9C 44039000 */  mfc1        $v1, $ft5
    /* 8CE970 809FFCA0 144F0008 */  bne         $v0, $t7, .L809FFCC4
    /* 8CE974 809FFCA4 00000000 */   nop
    /* 8CE978 809FFCA8 C4880030 */  lwc1        $ft2, 0x30($a0)
    /* 8CE97C 809FFCAC 4600428D */  trunc.w.s   $ft3, $ft2
    /* 8CE980 809FFCB0 44195000 */  mfc1        $t9, $ft3
    /* 8CE984 809FFCB4 00000000 */  nop
    /* 8CE988 809FFCB8 14790002 */  bne         $v1, $t9, .L809FFCC4
    /* 8CE98C 809FFCBC 00000000 */   nop
    /* 8CE990 809FFCC0 24050001 */  addiu       $a1, $zero, 0x1
  .L809FFCC4:
    /* 8CE994 809FFCC4 0C28018D */  jal         func_80A00634_jp
    /* 8CE998 809FFCC8 02002025 */   or         $a0, $s0, $zero
    /* 8CE99C 809FFCCC 3C0142A0 */  lui         $at, (0x42A00000 >> 16)
    /* 8CE9A0 809FFCD0 44818000 */  mtc1        $at, $ft4
    /* 8CE9A4 809FFCD4 00000000 */  nop
    /* 8CE9A8 809FFCD8 E6100144 */  swc1        $ft4, 0x144($s0)
    /* 8CE9AC 809FFCDC 0C014A35 */  jal         cKF_SkeletonInfo_R_play
    /* 8CE9B0 809FFCE0 8FA4002C */   lw         $a0, 0x2C($sp)
    /* 8CE9B4 809FFCE4 8FBF0024 */  lw          $ra, 0x24($sp)
    /* 8CE9B8 809FFCE8 8FB00020 */  lw          $s0, 0x20($sp)
    /* 8CE9BC 809FFCEC 27BD0050 */  addiu       $sp, $sp, 0x50
    /* 8CE9C0 809FFCF0 03E00008 */  jr          $ra
    /* 8CE9C4 809FFCF4 00000000 */   nop
endlabel aBGY_actor_ct
```

# Rules

- In order to decompile this function, you may need to create new types. Include them on the result.

- SHOW THE ENTIRE CODE WITHOUT CROPPING.
