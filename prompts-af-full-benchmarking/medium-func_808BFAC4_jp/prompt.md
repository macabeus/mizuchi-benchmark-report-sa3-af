You are decompiling an assembly function called `func_808BFAC4_jp` in MIPS from a Nintendo 64 game.

# Examples

## `mChoice_MainSetup`

```c
void mChoice_MainSetup(Choice* choice, Game* game) {
    static ChoiceMainProc proc[] = {
        &mChoice_MainSetup_Hide,
        &mChoice_MainSetup_Appear,
        &mChoice_MainSetup_Normal,
        &mChoice_MainSetup_Disappear,
    };

    s32 index = choice->requestedMainIdx;

    if (index < 0) {
        return;
    } else if (index < 0 || index >= 4 || proc[index] == NULL) {
        return;
    }

    (*proc[index])(choice, game);
}
```

```asm
         addiu sp, sp, -0x18
         sw ra, 0x14(sp)
         lw v0, 0xa0(a0)
         bltzl v0, .L4417
         lw ra, 0x14(sp)
         bltz v0, .L4016
         slti at, v0, 0x4
         beqz at, .L4016
         sll t6, v0, 2
         lui v1, %hi([.data]+0x184)
         addu v1, v1, t6
         lw v1, %lo([.data]+0x184)(v1)
         beqzl v1, .L4417
         lw ra, 0x14(sp)
         jalr v1
         nop 
     5lw  ra, 0x14(sp)
     3addiu sp, sp, 0x18
         jr ra
         nop 
```

## `mChoice_Put_String`

```c
s32 mChoice_Put_String(char* data, s32 idx, s32 maxSize, Actor* actor) {
    static ChoicePutStringProc proc[] = {
        NULL,
        NULL,
        NULL,
        NULL,
        NULL,
        NULL,
        NULL,
        NULL,
        NULL,
        NULL,
        NULL,
        NULL,
        NULL,
        NULL,
        NULL,
        NULL,
        NULL,
        NULL,
        NULL,
        NULL,
        NULL,
        NULL,
        NULL,
        NULL,
        NULL,
        NULL,
        &mChoice_Put_String_PLAYER_NAME,
        &mChoice_Put_String_TALK_NAME,
        &mChoice_Put_String_TAIL,
        &mChoice_Put_String_YEAR,
        &mChoice_Put_String_MONTH,
        &mChoice_Put_String_WEEK,
        &mChoice_Put_String_DAY,
        &mChoice_Put_String_HOUR,
        &mChoice_Put_String_MIN,
        &mChoice_Put_String_SEC,
        &mChoice_Put_String_FREE0,
        &mChoice_Put_String_FREE1,
        &mChoice_Put_String_FREE2,
        &mChoice_Put_String_FREE3,
        &mChoice_Put_String_FREE4,
        &mChoice_Put_String_FREE5,
        &mChoice_Put_String_FREE6,
        &mChoice_Put_String_FREE7,
        &mChoice_Put_String_FREE8,
        &mChoice_Put_String_FREE9,
        &mChoice_Put_String_DETERMINATION,
        &mChoice_Put_String_COUNTRY_NAME,
        &mChoice_Put_String_RAMDOM_NUMBER2,
        &mChoice_Put_String_ITEM0,
        &mChoice_Put_String_ITEM1,
        &mChoice_Put_String_ITEM2,
        &mChoice_Put_String_ITEM3,
        &mChoice_Put_String_ITEM4,
        &mChoice_Put_String_FREE10,
        &mChoice_Put_String_FREE11,
        &mChoice_Put_String_FREE12,
        &mChoice_Put_String_FREE13,
        &mChoice_Put_String_FREE14,
        &mChoice_Put_String_FREE15,
        &mChoice_Put_String_FREE16,
        &mChoice_Put_String_FREE17,
        &mChoice_Put_String_FREE18,
        &mChoice_Put_String_FREE19,
        NULL,
        NULL,
        NULL,
        NULL,
        NULL,
        NULL,
        NULL,
        NULL,
        NULL,
        NULL,
        NULL,
        NULL,
        NULL,
        NULL,
        NULL,
        NULL,
        NULL,
        NULL,
        NULL,
        NULL,
        NULL,
        NULL,
        NULL,
        NULL,
        NULL,
        NULL,
        NULL,
        NULL,
        NULL,
        NULL,
        NULL,
        NULL,
        NULL,
    };

    s32 type = data[idx + 1];

    if (type >= 0 && type < 97 && proc[type] != NULL) {
        return (*proc[type])(data, idx, maxSize, actor);
    }

    return maxSize;
}
```

```asm
         addiu sp, sp, -0x18
         sw ra, 0x14(sp)
         addu t6, a1, a0
         lbu v0, 0x1(t6)
         bltz v0, .L4417
         slti at, v0, 0x61
         beqz at, .L4417
         sll t7, v0, 2
         lui v1, %hi([.data])
         addu v1, v1, t7
         lw v1, %lo([.data])(v1)
         beqzl v1, .L4818
         or v0, a2, zero
         jalr v1
         nop 
         b .L4c19
         lw ra, 0x14(sp)
     4or  v0, a2, zero
     11lw ra, 0x14(sp)
     15addiu sp, sp, 0x18
         jr ra
         nop 
```

## `mChoice_Main`

```c
void mChoice_Main(Choice* choice, Game* game) {
    static ChoiceMainProc proc[] = {
        &mChoice_Main_Hide,
        &mChoice_Main_Appear,
        &mChoice_Main_Normal,
        &mChoice_Main_Disappear,
    };

    s32 index = choice->mainIdx;

    if (index < 0 || index >= 4 || proc[index] == NULL) {
        return;
    }

    (*proc[index])(choice, game);
}
```

```asm
         addiu sp, sp, -0x18
         sw ra, 0x14(sp)
         lw v0, 0x9c(a0)
         bltz v0, .L3814
         slti at, v0, 0x4
         beqz at, .L3814
         sll t6, v0, 2
         lui v1, %hi([.data]+0x194)
         addu v1, v1, t6
         lw v1, %lo([.data]+0x194)(v1)
         beqzl v1, .L3c15
         lw ra, 0x14(sp)
         jalr v1
         nop 
     3lw  ra, 0x14(sp)
     10addiu sp, sp, 0x18
         jr ra
         nop 
```

## `Ac_Sample_Actor_main`

```c
void Ac_Sample_Actor_main(Actor* thisx, Game_Play* play) {
    static SampleActionFunc proc[] = { &Ac_Sample_Actor_main_wait, &Ac_Sample_Actor_main_talk };
    Sample* this = (Sample*)thisx;
    s32 action = this->mainAction;

    func_80934104_jp(thisx, play);
    if (action < 0 || action >= 2 || proc[action] == NULL) {
        return;
    }

    proc[action](this, play);
}
```

```asm
         addiu sp, sp, -0x20
         sw ra, 0x14(sp)
         sw a1, 0x24(sp)
         lw v0, 0x260(a0)
         sw a0, 0x20(sp)
         lw a1, 0x24(sp)
         jal func_80934104_jp
         sw v0, 0x18(sp)
         lw v0, 0x18(sp)
         lw a0, 0x20(sp)
         bltz v0, .L5421
         slti at, v0, 0x2
         beqz at, .L5421
         sll t6, v0, 2
         lui v1, %hi([.data]+0x24)
         addu v1, v1, t6
         lw v1, %lo([.data]+0x24)(v1)
         beqzl v1, .L5822
         lw ra, 0x14(sp)
         jalr v1
         lw a1, 0x24(sp)
     10lw ra, 0x14(sp)
     17addiu sp, sp, 0x20
         jr ra
         nop 
```

## `Ac_Sample_Actor_draw`

```c
void Ac_Sample_Actor_draw(Actor* thisx, Game_Play* play) {
    static SampleActionFunc proc[] = { (SampleActionFunc)none_proc2, Ac_Sample_Actor_draw_normal };
    Sample* this = (Sample*)thisx;

    s32 action = this->drawAction;

    func_80934104_jp(&this->actor, play);
    if (action < 0 || action >= 2 || proc[action] == NULL) {
        return;
    }

    proc[action](this, play);
}
```

```asm
         addiu sp, sp, -0x20
         sw ra, 0x14(sp)
         sw a1, 0x24(sp)
         lw v0, 0x264(a0)
         sw a0, 0x20(sp)
         lw a1, 0x24(sp)
         jal func_80934104_jp
         sw v0, 0x18(sp)
         lw v0, 0x18(sp)
         lw a0, 0x20(sp)
         bltz v0, .L5421
         slti at, v0, 0x2
         beqz at, .L5421
         sll t6, v0, 2
         lui v1, %hi([.data]+0x2c)
         addu v1, v1, t6
         lw v1, %lo([.data]+0x2c)(v1)
         beqzl v1, .L5822
         lw ra, 0x14(sp)
         jalr v1
         lw a1, 0x24(sp)
     10lw ra, 0x14(sp)
     17addiu sp, sp, 0x20
         jr ra
         nop 
```









# Primary Objective

Decompile the following target assembly function from `asm/jp/nonmatchings/overlays/actors/player_actor/m_player/func_808BFAC4_jp.s` into clean, readable C code that compiles to an assembly matching EXACTLY the original one.

```asm
glabel func_808BFAC4_jp
nonmatching func_808BFAC4_jp, 0x6C
    /* 7B9194 808BFAC4 27BDFFD8 */  addiu       $sp, $sp, -0x28
    /* 7B9198 808BFAC8 AFBF0024 */  sw          $ra, 0x24($sp)
    /* 7B919C 808BFACC AFA40028 */  sw          $a0, 0x28($sp)
    /* 7B91A0 808BFAD0 AFA5002C */  sw          $a1, 0x2C($sp)
    /* 7B91A4 808BFAD4 04C00011 */  bltz        $a2, .L808BFB1C
    /* 7B91A8 808BFAD8 28C1001A */   slti       $at, $a2, 0x1A
    /* 7B91AC 808BFADC 1020000F */  beqz        $at, .L808BFB1C
    /* 7B91B0 808BFAE0 00067080 */   sll        $t6, $a2, 2
    /* 7B91B4 808BFAE4 3C02808E */  lui         $v0, %hi(D_808DF908_jp)
    /* 7B91B8 808BFAE8 004E1021 */  addu        $v0, $v0, $t6
    /* 7B91BC 808BFAEC 8C42F908 */  lw          $v0, %lo(D_808DF908_jp)($v0)
    /* 7B91C0 808BFAF0 8FA4003C */  lw          $a0, 0x3C($sp)
    /* 7B91C4 808BFAF4 8FA50028 */  lw          $a1, 0x28($sp)
    /* 7B91C8 808BFAF8 10400008 */  beqz        $v0, .L808BFB1C
    /* 7B91CC 808BFAFC 8FA6002C */   lw         $a2, 0x2C($sp)
    /* 7B91D0 808BFB00 8FAF0038 */  lw          $t7, 0x38($sp)
    /* 7B91D4 808BFB04 8FB80040 */  lw          $t8, 0x40($sp)
    /* 7B91D8 808BFB08 8FB90044 */  lw          $t9, 0x44($sp)
    /* 7B91DC 808BFB0C AFAF0010 */  sw          $t7, 0x10($sp)
    /* 7B91E0 808BFB10 AFB80014 */  sw          $t8, 0x14($sp)
    /* 7B91E4 808BFB14 0040F809 */  jalr        $v0
    /* 7B91E8 808BFB18 AFB90018 */   sw         $t9, 0x18($sp)
  .L808BFB1C:
    /* 7B91EC 808BFB1C 24020001 */  addiu       $v0, $zero, 0x1
    /* 7B91F0 808BFB20 8FBF0024 */  lw          $ra, 0x24($sp)
    /* 7B91F4 808BFB24 27BD0028 */  addiu       $sp, $sp, 0x28
    /* 7B91F8 808BFB28 03E00008 */  jr          $ra
    /* 7B91FC 808BFB2C 00000000 */   nop
endlabel func_808BFAC4_jp
```

# Rules

- In order to decompile this function, you may need to create new types. Include them on the result.

- SHOW THE ENTIRE CODE WITHOUT CROPPING.
