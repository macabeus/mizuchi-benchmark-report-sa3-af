You are decompiling an assembly function called `func_808B83B4_jp` in MIPS from a Nintendo 64 game.







# Declarations for the functions called from the target assembly

- `s8 Player_actor_Get_ItemKind(Actor* actor, s32 kind);`

# Types definitions used in the declarations

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

Decompile the following target assembly function from `asm/jp/nonmatchings/overlays/actors/player_actor/m_player/func_808B83B4_jp.s` into clean, readable C code that compiles to an assembly matching EXACTLY the original one.

```asm
glabel func_808B83B4_jp
nonmatching func_808B83B4_jp, 0xB8
    /* 7B1A84 808B83B4 27BDFFD0 */  addiu       $sp, $sp, -0x30
    /* 7B1A88 808B83B8 AFB00024 */  sw          $s0, 0x24($sp)
    /* 7B1A8C 808B83BC 00808025 */  or          $s0, $a0, $zero
    /* 7B1A90 808B83C0 AFBF002C */  sw          $ra, 0x2C($sp)
    /* 7B1A94 808B83C4 AFB10028 */  sw          $s1, 0x28($sp)
    /* 7B1A98 808B83C8 AFA50034 */  sw          $a1, 0x34($sp)
    /* 7B1A9C 808B83CC AFA60038 */  sw          $a2, 0x38($sp)
    /* 7B1AA0 808B83D0 AFA7003C */  sw          $a3, 0x3C($sp)
    /* 7B1AA4 808B83D4 02002025 */  or          $a0, $s0, $zero
    /* 7B1AA8 808B83D8 0C22F571 */  jal         Player_actor_Get_ItemKind
    /* 7B1AAC 808B83DC 8E050D00 */   lw         $a1, 0xD00($s0)
    /* 7B1AB0 808B83E0 C7A40040 */  lwc1        $ft0, 0x40($sp)
    /* 7B1AB4 808B83E4 C7A60044 */  lwc1        $ft1, 0x44($sp)
    /* 7B1AB8 808B83E8 240E0001 */  addiu       $t6, $zero, 0x1
    /* 7B1ABC 808B83EC 00408825 */  or          $s1, $v0, $zero
    /* 7B1AC0 808B83F0 AFAE0018 */  sw          $t6, 0x18($sp)
    /* 7B1AC4 808B83F4 02002025 */  or          $a0, $s0, $zero
    /* 7B1AC8 808B83F8 00402825 */  or          $a1, $v0, $zero
    /* 7B1ACC 808B83FC 8FA60038 */  lw          $a2, 0x38($sp)
    /* 7B1AD0 808B8400 8FA7003C */  lw          $a3, 0x3C($sp)
    /* 7B1AD4 808B8404 E7A40010 */  swc1        $ft0, 0x10($sp)
    /* 7B1AD8 808B8408 0C22F76D */  jal         func_808BDDB4_jp
    /* 7B1ADC 808B840C E7A60014 */   swc1       $ft1, 0x14($sp)
    /* 7B1AE0 808B8410 06200006 */  bltz        $s1, .L808B842C
    /* 7B1AE4 808B8414 8FB80034 */   lw         $t8, 0x34($sp)
    /* 7B1AE8 808B8418 0C22F59A */  jal         func_808BD668_jp
    /* 7B1AEC 808B841C 02202025 */   or         $a0, $s1, $zero
    /* 7B1AF0 808B8420 8FAF0048 */  lw          $t7, 0x48($sp)
    /* 7B1AF4 808B8424 10000003 */  b           .L808B8434
    /* 7B1AF8 808B8428 ADE20000 */   sw         $v0, 0x0($t7)
  .L808B842C:
    /* 7B1AFC 808B842C 8FB90048 */  lw          $t9, 0x48($sp)
    /* 7B1B00 808B8430 AF380000 */  sw          $t8, 0x0($t9)
  .L808B8434:
    /* 7B1B04 808B8434 0C22F5A4 */  jal         func_808BD690_jp
    /* 7B1B08 808B8438 02202025 */   or         $a0, $s1, $zero
    /* 7B1B0C 808B843C AE020CFC */  sw          $v0, 0xCFC($s0)
    /* 7B1B10 808B8440 A2111117 */  sb          $s1, 0x1117($s0)
    /* 7B1B14 808B8444 8FA80048 */  lw          $t0, 0x48($sp)
    /* 7B1B18 808B8448 0C22D6CE */  jal         func_808B5B38_jp
    /* 7B1B1C 808B844C 8D040000 */   lw         $a0, 0x0($t0)
    /* 7B1B20 808B8450 8FA9004C */  lw          $t1, 0x4C($sp)
    /* 7B1B24 808B8454 AD220000 */  sw          $v0, 0x0($t1)
    /* 7B1B28 808B8458 8FBF002C */  lw          $ra, 0x2C($sp)
    /* 7B1B2C 808B845C 8FB00024 */  lw          $s0, 0x24($sp)
    /* 7B1B30 808B8460 8FB10028 */  lw          $s1, 0x28($sp)
    /* 7B1B34 808B8464 03E00008 */  jr          $ra
    /* 7B1B38 808B8468 27BD0030 */   addiu      $sp, $sp, 0x30
endlabel func_808B83B4_jp
```

# Rules

- In order to decompile this function, you may need to create new types. Include them on the result.

- SHOW THE ENTIRE CODE WITHOUT CROPPING.
