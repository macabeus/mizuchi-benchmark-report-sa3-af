You are decompiling an assembly function called `func_809AFAF0_jp` in MIPS from a Nintendo 64 game.







# Declarations for the functions called from the target assembly

- `Choice* mChoice_Get_base_window_p();`
- `s32 mChoice_Get_ChoseNum(Choice* choice);`
- `MessageWindow* mMsg_Get_base_window_p(void);`

# Types definitions used in the declarations

```c
typedef struct Choice {
    /* 0x00 */f32 centerX;
    /* 0x04 */f32 centerY;

    /* Initial XY position */
    /* 0x08 */ f32 centerXBegin;
    /* 0x0C */ f32 centerYBegin;

    /* Target XY position */
    /* 0x10 */ f32 centerXTarget;
    /* 0x14 */ f32 centerYTarget;

    /* Text settings */
    /* 0x18 */ Color_RGBA8 textColor;
    /* 0x1C */ f32 textScaleX;
    /* 0x20 */ f32 textScaleY;
    /* 0x24 */ f32 textX;
    /* 0x28 */ f32 textY;

    /* Window scaling XY */
    /* 0x2C */ f32 scaleX;
    /* 0x30 */ f32 scaleY;

    /* Text related data */
    /* 0x34 */ ChoiceData data;

    /* 0x84 */ s32 selectedChoiceIdx;
    /* 0x88 */ Color_RGBA8 selectedChoiceTextColor;

    /* 0x8C */ Color_RGBA8 backgroundColor;

    /* 0x90 */ f32 unk_D4;
    /* 0x94 */ f32 unk_D8;

    /* 0x98 */ f32 scale;  // total choice window scaling percentage

    /* 0x9C */ s32 mainIdx;
    /* 0xA0 */ s32 requestedMainIdx;

    /* 0xA4 */ s32 isWindowVisible;
    /* 0xA8 */ s32 isFontVisible;

    /* 0xAC */ s32 choiceAutomoveType;
    /* 0xB0 */ f32 choiceAutomoveTimer;

    /* 0xB4 */ f32 timer;

    /* 0xB8 */ u8 noBFlag;      // can't press B to select last option
    /* 0xB9 */ u8 noCloseFlag;  // pressing B won't auto-cancel the choice selection?
} Choice;
```

```c
typedef struct MessageWindow {
    /* 0x000 */ UNK_TYPE1 unk_000[0x1B0];
    /* 0x1B0 */ Choice choiceWindow;
} MessageWindow;
```

# Primary Objective

Decompile the following target assembly function from `asm/jp/nonmatchings/overlays/actors/ovl_Npc_Guide/ac_npc_guide/func_809AFAF0_jp.s` into clean, readable C code that compiles to an assembly matching EXACTLY the original one.

```asm
glabel func_809AFAF0_jp
nonmatching func_809AFAF0_jp, 0x90
    /* 893300 809AFAF0 27BDFFE8 */  addiu       $sp, $sp, -0x18
    /* 893304 809AFAF4 AFBF0014 */  sw          $ra, 0x14($sp)
    /* 893308 809AFAF8 AFA40018 */  sw          $a0, 0x18($sp)
    /* 89330C 809AFAFC AFA5001C */  sw          $a1, 0x1C($sp)
    /* 893310 809AFB00 0C02747C */  jal         mMsg_Get_base_window_p
    /* 893314 809AFB04 00000000 */   nop
    /* 893318 809AFB08 0C027A42 */  jal         func_8009E908_jp
    /* 89331C 809AFB0C 00402025 */   or         $a0, $v0, $zero
    /* 893320 809AFB10 24010001 */  addiu       $at, $zero, 0x1
    /* 893324 809AFB14 54410017 */  bnel        $v0, $at, .L809AFB74
    /* 893328 809AFB18 8FBF0014 */   lw         $ra, 0x14($sp)
    /* 89332C 809AFB1C 0C019410 */  jal         mChoice_Get_base_window_p
    /* 893330 809AFB20 00000000 */   nop
    /* 893334 809AFB24 0C01953F */  jal         mChoice_Get_ChoseNum
    /* 893338 809AFB28 00402025 */   or         $a0, $v0, $zero
    /* 89333C 809AFB2C 10400006 */  beqz        $v0, .L809AFB48
    /* 893340 809AFB30 8FA40018 */   lw         $a0, 0x18($sp)
    /* 893344 809AFB34 24010001 */  addiu       $at, $zero, 0x1
    /* 893348 809AFB38 10410008 */  beq         $v0, $at, .L809AFB5C
    /* 89334C 809AFB3C 8FA40018 */   lw         $a0, 0x18($sp)
    /* 893350 809AFB40 1000000C */  b           .L809AFB74
    /* 893354 809AFB44 8FBF0014 */   lw         $ra, 0x14($sp)
  .L809AFB48:
    /* 893358 809AFB48 8FA5001C */  lw          $a1, 0x1C($sp)
    /* 89335C 809AFB4C 0C26C2E5 */  jal         func_809B0B94_jp
    /* 893360 809AFB50 24060009 */   addiu      $a2, $zero, 0x9
    /* 893364 809AFB54 10000007 */  b           .L809AFB74
    /* 893368 809AFB58 8FBF0014 */   lw         $ra, 0x14($sp)
  .L809AFB5C:
    /* 89336C 809AFB5C 240E0005 */  addiu       $t6, $zero, 0x5
    /* 893370 809AFB60 AC8E093C */  sw          $t6, 0x93C($a0)
    /* 893374 809AFB64 8FA5001C */  lw          $a1, 0x1C($sp)
    /* 893378 809AFB68 0C26C2E5 */  jal         func_809B0B94_jp
    /* 89337C 809AFB6C 24060004 */   addiu      $a2, $zero, 0x4
    /* 893380 809AFB70 8FBF0014 */  lw          $ra, 0x14($sp)
  .L809AFB74:
    /* 893384 809AFB74 27BD0018 */  addiu       $sp, $sp, 0x18
    /* 893388 809AFB78 03E00008 */  jr          $ra
    /* 89338C 809AFB7C 00000000 */   nop
endlabel func_809AFAF0_jp
```

# Rules

- In order to decompile this function, you may need to create new types. Include them on the result.

- SHOW THE ENTIRE CODE WITHOUT CROPPING.
