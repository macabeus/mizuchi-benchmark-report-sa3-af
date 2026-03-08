You are decompiling an assembly function called `func_80A77190_jp` in MIPS from a Nintendo 64 game.

# Examples

## `aTAM_actor_move`

```c
void aTAM_actor_move(Actor* thisx, Game_Play* game_play) {
    UNUSED UNK_TYPE1 pad[0x4];
    Tama* this = THIS;
    Player* player = get_player_actor_withoutCheck(game_play);
    s32 xBlock;
    s32 zBlock;
    s32 playerXBlock;
    s32 playerZBlock;

    mFI_Wpos2BlockNum(&xBlock, &zBlock, this->structureActor.actor.world.pos);
    mFI_Wpos2BlockNum(&playerXBlock, &playerZBlock, player->actor.world.pos);
    if ((mDemo_Check(1, &player->actor) == 0) && (mDemo_Check(5, &player->actor) == 0) &&
        ((xBlock != playerXBlock) || (zBlock != playerZBlock))) {
        Actor_delete(&this->structureActor.actor);
    } else {
        ((TamaActionFunc)this->structureActor.process)(this, game_play);
    }
}
```

```asm
         addiu sp, sp, -0x40
         sw ra, 0x1c(sp)
         sw a0, 0x40(sp)
         sw a1, 0x44(sp)
         jal get_player_actor_withoutCheck
         lw a0, 0x44(sp)
         lw t6, 0x40(sp)
         sw v0, 0x34(sp)
         addiu a0, sp, 0x30
         lw t8, 0x28(t6)
         addiu a1, sp, 0x2c
         sw t8, 0x8(sp)
         lw a3, 0x2c(t6)
         lw a2, 0x8(sp)
         sw a3, 0xc(sp)
         lw t8, 0x30(t6)
         jal mFI_Wpos2BlockNum
         sw t8, 0x10(sp)
         lw t9, 0x34(sp)
         addiu a0, sp, 0x28
         addiu a1, sp, 0x24
         lw t1, 0x28(t9)
         sw t1, 0x8(sp)
         lw a3, 0x2c(t9)
         lw a2, 0x8(sp)
         sw a3, 0xc(sp)
         lw t1, 0x30(t9)
         jal mFI_Wpos2BlockNum
         sw t1, 0x10(sp)
         addiu a0, zero, 0x1
         jal mDemo_Check
         lw a1, 0x34(sp)
         bnez v0, .Lc449
         addiu a0, zero, 0x5
         jal mDemo_Check
         lw a1, 0x34(sp)
         bnez v0, .Lc449
         lw t2, 0x30(sp)
         lw t3, 0x28(sp)
         lw t4, 0x2c(sp)
         lw t5, 0x24(sp)
         bne t2, t3, .Lb445
         nop 
         beql t4, t5, .Lc850
         lw a0, 0x40(sp)
     41jal Actor_delete
         lw a0, 0x40(sp)
         b .Ldc55
         lw ra, 0x1c(sp)
     32lw a0, 0x40(sp)
     43lw a1, 0x44(sp)
         lw t9, 0x2a0(a0)
         jalr t9
         nop 
         lw ra, 0x1c(sp)
     47addiu sp, sp, 0x40
         jr ra
         nop 
```

## `aGOZ_actor_move`

```c
void aGOZ_actor_move(Actor* thisx, Game_Play* game_play) {
    Goza* this = THIS;
    StructureActor* goza = &this->structureActor;
    Player* player = get_player_actor_withoutCheck(game_play);
    s32 gozaBlockX;
    s32 gozaBlockZ;
    s32 playerBlockX;
    s32 playerBlockZ;

    mFI_Wpos2BlockNum(&gozaBlockX, &gozaBlockZ, goza->actor.world.pos);
    mFI_Wpos2BlockNum(&playerBlockX, &playerBlockZ, player->actor.world.pos);

    if (!mDemo_Check(1, &player->actor) && !mDemo_Check(5, &player->actor) &&
        ((gozaBlockX != playerBlockX) || (gozaBlockZ != playerBlockZ))) {
        Actor_delete(&goza->actor);
    } else {
        ((GozaActionFunc)goza->process)(this, game_play);
    }
}
```

```asm
         addiu sp, sp, -0x40
         sw ra, 0x1c(sp)
         sw a0, 0x40(sp)
         sw a1, 0x44(sp)
         jal get_player_actor_withoutCheck
         lw a0, 0x44(sp)
         lw t6, 0x40(sp)
         sw v0, 0x34(sp)
         addiu a0, sp, 0x30
         lw t8, 0x28(t6)
         addiu a1, sp, 0x2c
         sw t8, 0x8(sp)
         lw a3, 0x2c(t6)
         lw a2, 0x8(sp)
         sw a3, 0xc(sp)
         lw t8, 0x30(t6)
         jal mFI_Wpos2BlockNum
         sw t8, 0x10(sp)
         lw t9, 0x34(sp)
         addiu a0, sp, 0x28
         addiu a1, sp, 0x24
         lw t1, 0x28(t9)
         sw t1, 0x8(sp)
         lw a3, 0x2c(t9)
         lw a2, 0x8(sp)
         sw a3, 0xc(sp)
         lw t1, 0x30(t9)
         jal mFI_Wpos2BlockNum
         sw t1, 0x10(sp)
         addiu a0, zero, 0x1
         jal mDemo_Check
         lw a1, 0x34(sp)
         bnez v0, .Lc449
         addiu a0, zero, 0x5
         jal mDemo_Check
         lw a1, 0x34(sp)
         bnez v0, .Lc449
         lw t2, 0x30(sp)
         lw t3, 0x28(sp)
         lw t4, 0x2c(sp)
         lw t5, 0x24(sp)
         bne t2, t3, .Lb445
         nop 
         beql t4, t5, .Lc850
         lw a0, 0x40(sp)
     41jal Actor_delete
         lw a0, 0x40(sp)
         b .Ldc55
         lw ra, 0x1c(sp)
     32lw a0, 0x40(sp)
     43lw a1, 0x44(sp)
         lw t9, 0x2a0(a0)
         jalr t9
         nop 
         lw ra, 0x1c(sp)
     47addiu sp, sp, 0x40
         jr ra
         nop 
```

## `aKAG_actor_move`

```c
void aKAG_actor_move(Actor* thisx, Game_Play* game_play) {
    UNUSED UNK_TYPE1 pad[0x4];
    Kago* this = THIS;
    Player* player = get_player_actor_withoutCheck(game_play);
    s32 xBlock;
    s32 zBlock;
    s32 playerXBlock;
    s32 playerZBlock;

    mFI_Wpos2BlockNum(&xBlock, &zBlock, this->structureActor.actor.world.pos);
    mFI_Wpos2BlockNum(&playerXBlock, &playerZBlock, player->actor.world.pos);
    if ((mDemo_Check(1, &player->actor) == 0) && (mDemo_Check(5, &player->actor) == 0) &&
        ((xBlock != playerXBlock) || (zBlock != playerZBlock))) {
        Actor_delete(&this->structureActor.actor);
    } else {
        ((KagoActionFunc)this->structureActor.process)(this, game_play);
    }
}
```

```asm
         addiu sp, sp, -0x40
         sw ra, 0x1c(sp)
         sw a0, 0x40(sp)
         sw a1, 0x44(sp)
         jal get_player_actor_withoutCheck
         lw a0, 0x44(sp)
         lw t6, 0x40(sp)
         sw v0, 0x34(sp)
         addiu a0, sp, 0x30
         lw t8, 0x28(t6)
         addiu a1, sp, 0x2c
         sw t8, 0x8(sp)
         lw a3, 0x2c(t6)
         lw a2, 0x8(sp)
         sw a3, 0xc(sp)
         lw t8, 0x30(t6)
         jal mFI_Wpos2BlockNum
         sw t8, 0x10(sp)
         lw t9, 0x34(sp)
         addiu a0, sp, 0x28
         addiu a1, sp, 0x24
         lw t1, 0x28(t9)
         sw t1, 0x8(sp)
         lw a3, 0x2c(t9)
         lw a2, 0x8(sp)
         sw a3, 0xc(sp)
         lw t1, 0x30(t9)
         jal mFI_Wpos2BlockNum
         sw t1, 0x10(sp)
         addiu a0, zero, 0x1
         jal mDemo_Check
         lw a1, 0x34(sp)
         bnez v0, .Lc449
         addiu a0, zero, 0x5
         jal mDemo_Check
         lw a1, 0x34(sp)
         bnez v0, .Lc449
         lw t2, 0x30(sp)
         lw t3, 0x28(sp)
         lw t4, 0x2c(sp)
         lw t5, 0x24(sp)
         bne t2, t3, .Lb445
         nop 
         beql t4, t5, .Lc850
         lw a0, 0x40(sp)
     41jal Actor_delete
         lw a0, 0x40(sp)
         b .Ldc55
         lw ra, 0x1c(sp)
     32lw a0, 0x40(sp)
     43lw a1, 0x44(sp)
         lw t9, 0x2a0(a0)
         jalr t9
         nop 
         lw ra, 0x1c(sp)
     47addiu sp, sp, 0x40
         jr ra
         nop 
```

## `aRAD_actor_move`

```c
void aRAD_actor_move(Actor* thisx, Game_Play* game_play) {
    Radio* this = (Radio*)thisx;
    UNUSED s32 pad;
    Player* player = get_player_actor_withoutCheck(game_play);

    s32 thisBlockX;
    s32 thisBlockZ;
    s32 playerBlockX;
    s32 playerBlockZ;

    mFI_Wpos2BlockNum(&thisBlockX, &thisBlockZ, thisx->world.pos);
    mFI_Wpos2BlockNum(&playerBlockX, &playerBlockZ, player->actor.world.pos);
    if ((mDemo_Check(1, &player->actor) == 0) && (mDemo_Check(5, &player->actor) == 0) &&
        ((thisBlockX != playerBlockX) || (thisBlockZ != playerBlockZ))) {
        Actor_delete(thisx);
        return;
    }
    ((RadioActionFunc)this->structureActor.process)(this, game_play);
}
```

```asm
         addiu sp, sp, -0x40
         sw ra, 0x1c(sp)
         sw a0, 0x40(sp)
         sw a1, 0x44(sp)
         jal get_player_actor_withoutCheck
         lw a0, 0x44(sp)
         lw t6, 0x40(sp)
         sw v0, 0x34(sp)
         addiu a0, sp, 0x30
         lw t8, 0x28(t6)
         addiu a1, sp, 0x2c
         sw t8, 0x8(sp)
         lw a3, 0x2c(t6)
         lw a2, 0x8(sp)
         sw a3, 0xc(sp)
         lw t8, 0x30(t6)
         jal mFI_Wpos2BlockNum
         sw t8, 0x10(sp)
         lw t9, 0x34(sp)
         addiu a0, sp, 0x28
         addiu a1, sp, 0x24
         lw t1, 0x28(t9)
         sw t1, 0x8(sp)
         lw a3, 0x2c(t9)
         lw a2, 0x8(sp)
         sw a3, 0xc(sp)
         lw t1, 0x30(t9)
         jal mFI_Wpos2BlockNum
         sw t1, 0x10(sp)
         addiu a0, zero, 0x1
         jal mDemo_Check
         lw a1, 0x34(sp)
         bnez v0, .Lc449
         addiu a0, zero, 0x5
         jal mDemo_Check
         lw a1, 0x34(sp)
         bnez v0, .Lc449
         lw t2, 0x30(sp)
         lw t3, 0x28(sp)
         lw t4, 0x2c(sp)
         lw t5, 0x24(sp)
         bne t2, t3, .Lb445
         nop 
         beql t4, t5, .Lc850
         lw a0, 0x40(sp)
     41jal Actor_delete
         lw a0, 0x40(sp)
         b .Ldc55
         lw ra, 0x1c(sp)
     32lw a0, 0x40(sp)
     43lw a1, 0x44(sp)
         lw t9, 0x2a0(a0)
         jalr t9
         nop 
         lw ra, 0x1c(sp)
     47addiu sp, sp, 0x40
         jr ra
         nop 
```

## `aMIK_actor_move`

```c
void aMIK_actor_move(Actor* actor, Game_Play* play) {
    Mikuji* mikuji = (Mikuji*)actor;
    UNUSED s32 pad;

    Player* player = get_player_actor_withoutCheck(play);
    s32 worldBx;
    s32 worldBz;
    s32 playerBx;
    s32 playerBz;

    mFI_Wpos2BlockNum(&worldBx, &worldBz, actor->world.pos);
    mFI_Wpos2BlockNum(&playerBx, &playerBz, player->actor.world.pos);

    if (mDemo_Check(1, &player->actor) == FALSE && mDemo_Check(5, &player->actor) == FALSE &&
        (worldBx != playerBx || worldBz != playerBz)) {
        Actor_delete(actor);
    } else {
        ((MikujiActionFunc)(mikuji->structureActor.process))(mikuji, play);
    }
}
```

```asm
         addiu sp, sp, -0x40
         sw ra, 0x1c(sp)
         sw a0, 0x40(sp)
         sw a1, 0x44(sp)
         jal get_player_actor_withoutCheck
         lw a0, 0x44(sp)
         lw t6, 0x40(sp)
         sw v0, 0x34(sp)
         addiu a0, sp, 0x30
         lw t8, 0x28(t6)
         addiu a1, sp, 0x2c
         sw t8, 0x8(sp)
         lw a3, 0x2c(t6)
         lw a2, 0x8(sp)
         sw a3, 0xc(sp)
         lw t8, 0x30(t6)
         jal mFI_Wpos2BlockNum
         sw t8, 0x10(sp)
         lw t9, 0x34(sp)
         addiu a0, sp, 0x28
         addiu a1, sp, 0x24
         lw t1, 0x28(t9)
         sw t1, 0x8(sp)
         lw a3, 0x2c(t9)
         lw a2, 0x8(sp)
         sw a3, 0xc(sp)
         lw t1, 0x30(t9)
         jal mFI_Wpos2BlockNum
         sw t1, 0x10(sp)
         addiu a0, zero, 0x1
         jal mDemo_Check
         lw a1, 0x34(sp)
         bnez v0, .Lc449
         addiu a0, zero, 0x5
         jal mDemo_Check
         lw a1, 0x34(sp)
         bnez v0, .Lc449
         lw t2, 0x30(sp)
         lw t3, 0x28(sp)
         lw t4, 0x2c(sp)
         lw t5, 0x24(sp)
         bne t2, t3, .Lb445
         nop 
         beql t4, t5, .Lc850
         lw a0, 0x40(sp)
     41jal Actor_delete
         lw a0, 0x40(sp)
         b .Ldc55
         lw ra, 0x1c(sp)
     32lw a0, 0x40(sp)
     43lw a1, 0x44(sp)
         lw t9, 0x2a0(a0)
         jalr t9
         nop 
         lw ra, 0x1c(sp)
     47addiu sp, sp, 0x40
         jr ra
         nop 
```





# Declarations for the functions called from the target assembly

- `s32 mFI_Wpos2BlockNum(s32* blockX, s32* blockZ, xyz_t wpos);`
- `struct Player* get_player_actor_withoutCheck(struct Game_Play* game_play);`
- `void Actor_delete(Actor* actor);`
- `s32 mDemo_Check(s32 type, struct Actor* actor);`

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

Decompile the following target assembly function from `asm/jp/nonmatchings/overlays/actors/ovl_Yatai/ac_yatai/func_80A77190_jp.s` into clean, readable C code that compiles to an assembly matching EXACTLY the original one.

```asm
glabel func_80A77190_jp
nonmatching func_80A77190_jp, 0xE8
    /* 937430 80A77190 27BDFFC0 */  addiu       $sp, $sp, -0x40
    /* 937434 80A77194 AFBF001C */  sw          $ra, 0x1C($sp)
    /* 937438 80A77198 AFA40040 */  sw          $a0, 0x40($sp)
    /* 93743C 80A7719C AFA50044 */  sw          $a1, 0x44($sp)
    /* 937440 80A771A0 0C02C721 */  jal         get_player_actor_withoutCheck
    /* 937444 80A771A4 8FA40044 */   lw         $a0, 0x44($sp)
    /* 937448 80A771A8 8FAE0040 */  lw          $t6, 0x40($sp)
    /* 93744C 80A771AC AFA20034 */  sw          $v0, 0x34($sp)
    /* 937450 80A771B0 27A40030 */  addiu       $a0, $sp, 0x30
    /* 937454 80A771B4 8DD80028 */  lw          $t8, 0x28($t6)
    /* 937458 80A771B8 27A5002C */  addiu       $a1, $sp, 0x2C
    /* 93745C 80A771BC AFB80008 */  sw          $t8, 0x8($sp)
    /* 937460 80A771C0 8DC7002C */  lw          $a3, 0x2C($t6)
    /* 937464 80A771C4 8FA60008 */  lw          $a2, 0x8($sp)
    /* 937468 80A771C8 AFA7000C */  sw          $a3, 0xC($sp)
    /* 93746C 80A771CC 8DD80030 */  lw          $t8, 0x30($t6)
    /* 937470 80A771D0 0C0221C4 */  jal         mFI_Wpos2BlockNum
    /* 937474 80A771D4 AFB80010 */   sw         $t8, 0x10($sp)
    /* 937478 80A771D8 8FB90034 */  lw          $t9, 0x34($sp)
    /* 93747C 80A771DC 27A40028 */  addiu       $a0, $sp, 0x28
    /* 937480 80A771E0 27A50024 */  addiu       $a1, $sp, 0x24
    /* 937484 80A771E4 8F290028 */  lw          $t1, 0x28($t9)
    /* 937488 80A771E8 AFA90008 */  sw          $t1, 0x8($sp)
    /* 93748C 80A771EC 8F27002C */  lw          $a3, 0x2C($t9)
    /* 937490 80A771F0 8FA60008 */  lw          $a2, 0x8($sp)
    /* 937494 80A771F4 AFA7000C */  sw          $a3, 0xC($sp)
    /* 937498 80A771F8 8F290030 */  lw          $t1, 0x30($t9)
    /* 93749C 80A771FC 0C0221C4 */  jal         mFI_Wpos2BlockNum
    /* 9374A0 80A77200 AFA90010 */   sw         $t1, 0x10($sp)
    /* 9374A4 80A77204 24040001 */  addiu       $a0, $zero, 0x1
    /* 9374A8 80A77208 0C01F3C0 */  jal         mDemo_Check
    /* 9374AC 80A7720C 8FA50034 */   lw         $a1, 0x34($sp)
    /* 9374B0 80A77210 14400010 */  bnez        $v0, .L80A77254
    /* 9374B4 80A77214 24040005 */   addiu      $a0, $zero, 0x5
    /* 9374B8 80A77218 0C01F3C0 */  jal         mDemo_Check
    /* 9374BC 80A7721C 8FA50034 */   lw         $a1, 0x34($sp)
    /* 9374C0 80A77220 1440000C */  bnez        $v0, .L80A77254
    /* 9374C4 80A77224 8FAA0030 */   lw         $t2, 0x30($sp)
    /* 9374C8 80A77228 8FAB0028 */  lw          $t3, 0x28($sp)
    /* 9374CC 80A7722C 8FAC002C */  lw          $t4, 0x2C($sp)
    /* 9374D0 80A77230 8FAD0024 */  lw          $t5, 0x24($sp)
    /* 9374D4 80A77234 154B0003 */  bne         $t2, $t3, .L80A77244
    /* 9374D8 80A77238 00000000 */   nop
    /* 9374DC 80A7723C 518D0006 */  beql        $t4, $t5, .L80A77258
    /* 9374E0 80A77240 8FA40040 */   lw         $a0, 0x40($sp)
  .L80A77244:
    /* 9374E4 80A77244 0C0159FA */  jal         Actor_delete
    /* 9374E8 80A77248 8FA40040 */   lw         $a0, 0x40($sp)
    /* 9374EC 80A7724C 10000007 */  b           .L80A7726C
    /* 9374F0 80A77250 8FBF001C */   lw         $ra, 0x1C($sp)
  .L80A77254:
    /* 9374F4 80A77254 8FA40040 */  lw          $a0, 0x40($sp)
  .L80A77258:
    /* 9374F8 80A77258 8FA50044 */  lw          $a1, 0x44($sp)
    /* 9374FC 80A7725C 8C9902A0 */  lw          $t9, 0x2A0($a0)
    /* 937500 80A77260 0320F809 */  jalr        $t9
    /* 937504 80A77264 00000000 */   nop
    /* 937508 80A77268 8FBF001C */  lw          $ra, 0x1C($sp)
  .L80A7726C:
    /* 93750C 80A7726C 27BD0040 */  addiu       $sp, $sp, 0x40
    /* 937510 80A77270 03E00008 */  jr          $ra
    /* 937514 80A77274 00000000 */   nop
endlabel func_80A77190_jp
```

# Rules

- In order to decompile this function, you may need to create new types. Include them on the result.

- SHOW THE ENTIRE CODE WITHOUT CROPPING.
