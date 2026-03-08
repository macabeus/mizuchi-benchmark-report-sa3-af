You are decompiling an assembly function called `func_80954E0C_jp` in MIPS from a Nintendo 64 game.

# Examples

## `mNpc_SetAnimalLastTalk`

```c
void mNpc_SetAnimalLastTalk(Animal_c* animal) {
    PrivateInfo* priv;
    Anmmem_c* memory = NULL;
    s32 memoryIdx;

    if (((uintptr_t)&common_data.privateInfo->playerId != NULL) && (animal != NULL)) {
        priv = common_data.privateInfo;
        memoryIdx = mNpc_GetAnimalMemoryIdx(&priv->playerId, animal->memories, ANIMAL_MEMORY_NUM);

        if (memoryIdx != -1) {
            memory = &animal->memories[memoryIdx];
        } else {
            memoryIdx = mNpc_ForceGetFreeAnimalMemoryIdx(animal->memories, ANIMAL_MEMORY_NUM);

            if (memoryIdx != -1) {
                memory = &animal->memories[memoryIdx];
                mNpc_SetAnimalMemory(&priv->playerId, memory);
            }
        }

        if (memory != NULL) {
            lbRTC_TimeCopy(&memory->lastSpeakTime, &common_data.time.rtcTime);
            mLd_CopyLandName(memory->land.name, common_data.save.landInfo.name);
            memory->land.id = common_data.save.landInfo.id;
            memory->savedTownTune = common_data.save.melody;
        }
    }
}
```

```asm
         addiu sp, sp, -0x38
         sw ra, 0x1c(sp)
         sw s0, 0x18(sp)
         sw a0, 0x38(sp)
         lui v0, %hi(common_data+0x10138)
         lw v0, %lo(common_data+0x10138)(v0)
         or s0, zero, zero
         lw t6, 0x38(sp)
         beqzl v0, .L10866
         lw ra, 0x1c(sp)
         beqz t6, .L10465
         or a0, v0, zero
         addiu a3, t6, 0x10
         or a1, a3, zero
         sw a3, 0x24(sp)
         addiu a2, zero, 0x7
         jal mNpc_GetAnimalMemoryIdx
         sw v0, 0x34(sp)
         addiu at, zero, -0x1
         beq v0, at, .L7830
         lw a3, 0x24(sp)
         sll t8, v0, 2
         subu t8, t8, v0
         lw t7, 0x38(sp)
         sll t8, t8, 2
         subu t8, t8, v0
         sll t8, t8, 4
         addu s0, t7, t8
         b .Lb846
         addiu s0, s0, 0x10
     19or a0, a3, zero
         jal mNpc_ForceGetFreeAnimalMemoryIdx
         addiu a1, zero, 0x7
         addiu at, zero, -0x1
         beq v0, at, .Lb846
         lw t9, 0x38(sp)
         sll t0, v0, 2
         subu t0, t0, v0
         sll t0, t0, 2
         subu t0, t0, v0
         sll t0, t0, 4
         addu a1, t9, t0
         addiu a1, a1, 0x10
         or s0, a1, zero
         jal mNpc_SetAnimalMemory
         lw a0, 0x34(sp)
     28beqz s0, .L10465
         addiu a0, s0, 0x10
         lui a1, %hi(common_data+0x1011c)
         jal lbRTC_TimeCopy
         addiu a1, a1, %lo(common_data+0x1011c)
         lui a1, %hi(common_data+0x2f60)
         addiu a1, a1, %lo(common_data+0x2f60)
         jal mLd_CopyLandName
         addiu a0, s0, 0x18
         lui v0, %hi(common_data)
         addiu v0, v0, %lo(common_data)
         lhu t1, 0x2f68(v0)
         addiu t2, v0, 0x7fff
         addiu t3, v0, 0x7fff
         sh t1, 0x1e(s0)
         lw t3, 0x742d(t3)
         lw t2, 0x7429(t2)
         sw t3, 0x24(s0)
         sw t2, 0x20(s0)
     10lw ra, 0x1c(sp)
     8lw  s0, 0x18(sp)
         addiu sp, sp, 0x38
         jr ra
         nop 
```

## `mNpc_GetFriendAnimalNum`

```c
s32 mNpc_GetFriendAnimalNum(PersonalID_c* pid) {
    Animal_c* animal = common_data.save.animals;
    s32 num = 0;
    s32 i;

    if (pid != NULL) {
        for (i = 0; i < ANIMAL_NUM_MAX; i++) {
            if (mNpc_CheckFreeAnimalPersonalID(&animal->id) == FALSE &&
                mNpc_GetAnimalMemoryIdx(pid, animal->memories, ANIMAL_MEMORY_NUM) != -1) {
                num++;
            }

            animal++;
        }
    }

    return num;
}
```

```asm
         addiu sp, sp, -0x30
         sw s3, 0x20(sp)
         or s3, a0, zero
         sw ra, 0x2c(sp)
         sw s5, 0x28(sp)
         sw s4, 0x24(sp)
         sw s2, 0x1c(sp)
         sw s1, 0x18(sp)
         sw s0, 0x14(sp)
         lui s0, %hi(common_data+0x9f18)
         addiu s0, s0, %lo(common_data+0x9f18)
         beqz s3, .L7429
         or s2, zero, zero
         or s1, zero, zero
         addiu s5, zero, 0xf
         addiu s4, zero, -0x1
     27jal mNpc_CheckFreeAnimalPersonalID
         or a0, s0, zero
         bnez v0, .L6826
         or a0, s3, zero
         addiu a1, s0, 0x10
         jal mNpc_GetAnimalMemoryIdx
         addiu a2, zero, 0x7
         beql v0, s4, .L6c27
         addiu s1, s1, 0x1
         addiu s2, s2, 0x1
     18addiu s1, s1, 0x1
     23bne s1, s5, .L4016
         addiu s0, s0, 0x528
     11or v0, s2, zero
         lw ra, 0x2c(sp)
         lw s0, 0x14(sp)
         lw s1, 0x18(sp)
         lw s2, 0x1c(sp)
         lw s3, 0x20(sp)
         lw s4, 0x24(sp)
         lw s5, 0x28(sp)
         jr ra
         addiu sp, sp, 0x30
```

## `mNpc_SetAnimalPersonalID2Memory`

```c
void mNpc_SetAnimalPersonalID2Memory(AnmPersonalID_c* anmId) {
    PrivateInfo* priv = priv = common_data.privateInfo;
    Animal_c* animal;
    s32 id;

    if (priv != NULL) {
        id = mNpc_SearchAnimalPersonalID(anmId);

        if (id != -1) {
            animal = &common_data.save.animals[id];
            id = mNpc_GetAnimalMemoryIdx(&priv->playerId, animal->memories, ANIMAL_MEMORY_NUM);

            if (id == -1) {
                id = mNpc_ForceGetFreeAnimalMemoryIdx(animal->memories, ANIMAL_MEMORY_NUM);

                if (id != -1) {
                    mNpc_SetAnimalMemory_NotSetDay(&priv->playerId, animal->memories + id);
                }
            }
        }
    }
}
```

```asm
         addiu sp, sp, -0x20
         sw ra, 0x14(sp)
         lui v0, %hi(common_data+0x10138)
         lw v0, %lo(common_data+0x10138)(v0)
         beqzl v0, .Lbc47
         lw ra, 0x14(sp)
         jal mNpc_SearchAnimalPersonalID
         sw v0, 0x1c(sp)
         addiu at, zero, -0x1
         beq v0, at, .Lb846
         sll t6, v0, 2
         addu t6, t6, v0
         sll t6, t6, 3
         addu t6, t6, v0
         sll t6, t6, 2
         addu t6, t6, v0
         lui t7, %hi(common_data)
         addiu t7, t7, %lo(common_data)
         sll t6, t6, 3
         addu v0, t6, t7
         ori at, zero, 0x9f18
         addu t8, v0, at
         ori at, zero, 0x9f28
         sw t8, 0x18(sp)
         addu a1, v0, at
         lw a0, 0x1c(sp)
         jal mNpc_GetAnimalMemoryIdx
         addiu a2, zero, 0x7
         addiu at, zero, -0x1
         bne v0, at, .Lb846
         lw a0, 0x18(sp)
         addiu a0, a0, 0x10
         jal mNpc_ForceGetFreeAnimalMemoryIdx
         addiu a1, zero, 0x7
         addiu at, zero, -0x1
         beq v0, at, .Lb846
         lw a0, 0x1c(sp)
         sll t0, v0, 2
         subu t0, t0, v0
         lw t9, 0x18(sp)
         sll t0, t0, 2
         subu t0, t0, v0
         sll t0, t0, 4
         addu a1, t9, t0
         jal mNpc_SetAnimalMemory_NotSetDay
         addiu a1, a1, 0x10
     9lw  ra, 0x14(sp)
     4addiu sp, sp, 0x20
         jr ra
         nop 
```

## `mNpc_InitNpcAllInfo`

```c
void mNpc_InitNpcAllInfo(s32 mallocFlag) {
    common_data.save.nowNpcMax = NPC_LOOKS_NUM;
    common_data.save.removeAnimalIdx = 0xFF;
    mNpc_ClearAnimalPersonalID(&common_data.save.lastRemovedAnimalId);
    mNpc_ClearAnyAnimalInfo(common_data.save.animals, ANIMAL_NUM_MAX);
    mNpc_DecideLivingNpcMax(common_data.save.animals, NPC_LOOKS_NUM, mallocFlag);
    mNpc_SetNpcNameID(common_data.save.animals, ANIMAL_NUM_MAX);
}
```

```asm
         addiu sp, sp, -0x18
         lui v0, %hi(common_data)
         addiu v0, v0, %lo(common_data)
         sw ra, 0x14(sp)
         sw a0, 0x18(sp)
         addiu t6, zero, 0x6
         addiu t7, zero, 0xff
         lui a0, %hi(common_data+0xec70)
         sb t6, 0x18(v0)
         sb t7, 0x19(v0)
         jal mNpc_ClearAnimalPersonalID
         addiu a0, a0, %lo(common_data+0xec70)
         lui a0, %hi(common_data+0x9f18)
         addiu a0, a0, %lo(common_data+0x9f18)
         jal mNpc_ClearAnyAnimalInfo
         addiu a1, zero, 0xf
         lui a0, %hi(common_data+0x9f18)
         addiu a0, a0, %lo(common_data+0x9f18)
         addiu a1, zero, 0x6
         jal mNpc_DecideLivingNpcMax
         lw a2, 0x18(sp)
         lui a0, %hi(common_data+0x9f18)
         addiu a0, a0, %lo(common_data+0x9f18)
         jal mNpc_SetNpcNameID
         addiu a1, zero, 0xf
         lw ra, 0x14(sp)
         addiu sp, sp, 0x18
         jr ra
         nop 
```

## `mNpc_GetAnimalPlateName`

```c
void mNpc_GetAnimalPlateName(char* dst, xyz_t wpos) {
    UNUSED s32 pad;
    Animal_c* animal = common_data.save.animals;
    s32 bx;
    s32 bz;
    s32 utX;
    s32 utZ;
    s32 i;
    Anmhome_c* home;

    if (mFI_Wpos2BkandUtNuminBlock(&bx, &bz, &utX, &utZ, wpos) == TRUE) {

        utX++;

        for (i = 0; i < ANIMAL_NUM_MAX; i++) {
            if (mNpc_CheckFreeAnimalInfo(animal) == FALSE) {
                home = &animal->homeInfo;

                if (home->blockX == bx && home->blockZ == bz && home->utX == utX && home->utZ == utZ) {
                    mNpc_GetNpcWorldNameAnm(dst, &animal->id);
                    break;
                }
            }

            animal++;
        }
    }
}
```

```asm
         addiu sp, sp, -0x60
         sw ra, 0x34(sp)
         sw s2, 0x30(sp)
         sw s1, 0x2c(sp)
         sw s0, 0x28(sp)
         sw a0, 0x60(sp)
         sw a1, 0x64(sp)
         sw a2, 0x68(sp)
         sw a3, 0x6c(sp)
         addiu t6, sp, 0x64
         lw t8, 0x0(t6)
         lui s0, %hi(common_data+0x9f18)
         addiu s0, s0, %lo(common_data+0x9f18)
         sw t8, 0x10(sp)
         lw t7, 0x4(t6)
         addiu a0, sp, 0x54
         addiu a1, sp, 0x50
         sw t7, 0x14(sp)
         lw t8, 0x8(t6)
         addiu a2, sp, 0x4c
         addiu a3, sp, 0x48
         jal mFI_Wpos2BkandUtNuminBlock
         sw t8, 0x18(sp)
         addiu at, zero, 0x1
         bne v0, at, .Le858
         lw t9, 0x4c(sp)
         addiu t0, t9, 0x1
         sw t0, 0x4c(sp)
         or s1, zero, zero
         addiu s2, zero, 0xf
     56jal mNpc_CheckFreeAnimalInfo
         or a0, s0, zero
         bnez v0, .Ldc55
         lw t1, 0x54(sp)
         lbu t2, 0x4e1(s0)
         addiu v0, s0, 0x4e0
         lw t3, 0x50(sp)
         bnel t1, t2, .Le056
         addiu s1, s1, 0x1
         lbu t4, 0x2(v0)
         lw t5, 0x4c(sp)
         bnel t3, t4, .Le056
         addiu s1, s1, 0x1
         lbu t6, 0x3(v0)
         lw t7, 0x48(sp)
         bnel t5, t6, .Le056
         addiu s1, s1, 0x1
         lbu t8, 0x4(v0)
         bnel t7, t8, .Le056
         addiu s1, s1, 0x1
         lw a0, 0x60(sp)
         jal mNpc_GetNpcWorldNameAnm
         or a1, s0, zero
         b .Lec59
         lw ra, 0x34(sp)
     32addiu s1, s1, 0x1
     37bne s1, s2, .L7830
         addiu s0, s0, 0x528
     24lw ra, 0x34(sp)
     53lw s0, 0x28(sp)
         lw s1, 0x2c(sp)
         lw s2, 0x30(sp)
         jr ra
         addiu sp, sp, 0x60
```





# Declarations for the functions called from the target assembly

- `void mLd_SetFreeStrLandMuraName(char* name, s32 freeStr);`
- `s32 mNpc_GetAnimalMemoryIdx(PersonalID_c* pid, Anmmem_c* memory, s32 num);`

# Types definitions used in the declarations

```c
typedef struct Anmmem_c {
    /* 0x000 */ PersonalID_c memoryPlayerId; /* personal id of the player memory belongs to */
    /* 0x014 */ lbRTC_time_c lastSpeakTime; /* time the player last spoke to this villager */
    /* 0x01C */ Anmland land; /* union between town NPC land memory & islander player action memory */
    /* 0x028 */ u64 savedTownTune; /* memory origin town tune */
    /* 0x030 */ s8 friendship; /* friendship with the player */
    /* 0x031 */ Anmlet letterInfo; /* saved letter flags */
    /* 0x032 */ Anmplmail_c letter; /* saved letter */
} Anmmem_c;
```

```c
typedef struct PersonalID_c {
	/* 0x00 */ char playerName[PLAYER_NAME_LEN];
    /* 0x06 */ char landName[LAND_NAME_SIZE];
	/* 0x0C */ u16 playerId;
	/* 0x0E */ u16 landId;
} PersonalID_c;
```

# Primary Objective

Decompile the following target assembly function from `asm/jp/nonmatchings/overlays/actors/ovl_Quest_Manager/ac_quest_manager/func_80954E0C_jp.s` into clean, readable C code that compiles to an assembly matching EXACTLY the original one.

```asm
glabel func_80954E0C_jp
nonmatching func_80954E0C_jp, 0x84
    /* 849BDC 80954E0C 27BDFFE8 */  addiu       $sp, $sp, -0x18
    /* 849BE0 80954E10 AFBF0014 */  sw          $ra, 0x14($sp)
    /* 849BE4 80954E14 AFA40018 */  sw          $a0, 0x18($sp)
    /* 849BE8 80954E18 8FA50018 */  lw          $a1, 0x18($sp)
    /* 849BEC 80954E1C 3C048013 */  lui         $a0, %hi(common_data + 0x10138)
    /* 849BF0 80954E20 8C846FD8 */  lw          $a0, %lo(common_data + 0x10138)($a0)
    /* 849BF4 80954E24 24060007 */  addiu       $a2, $zero, 0x7
    /* 849BF8 80954E28 0C029C8E */  jal         mNpc_GetAnimalMemoryIdx
    /* 849BFC 80954E2C 24A50010 */   addiu      $a1, $a1, 0x10
    /* 849C00 80954E30 2401FFFF */  addiu       $at, $zero, -0x1
    /* 849C04 80954E34 1041000A */  beq         $v0, $at, .L80954E60
    /* 849C08 80954E38 8FAE0018 */   lw         $t6, 0x18($sp)
    /* 849C0C 80954E3C 00027880 */  sll         $t7, $v0, 2
    /* 849C10 80954E40 01E27823 */  subu        $t7, $t7, $v0
    /* 849C14 80954E44 000F7880 */  sll         $t7, $t7, 2
    /* 849C18 80954E48 01E27823 */  subu        $t7, $t7, $v0
    /* 849C1C 80954E4C 000F7900 */  sll         $t7, $t7, 4
    /* 849C20 80954E50 01CF2021 */  addu        $a0, $t6, $t7
    /* 849C24 80954E54 24840028 */  addiu       $a0, $a0, 0x28
    /* 849C28 80954E58 0C025413 */  jal         mLd_SetFreeStrLandMuraName
    /* 849C2C 80954E5C 24050006 */   addiu      $a1, $zero, 0x6
  .L80954E60:
    /* 849C30 80954E60 8FA40018 */  lw          $a0, 0x18($sp)
    /* 849C34 80954E64 2405000A */  addiu       $a1, $zero, 0xA
    /* 849C38 80954E68 0C025413 */  jal         mLd_SetFreeStrLandMuraName
    /* 849C3C 80954E6C 24840510 */   addiu      $a0, $a0, 0x510
    /* 849C40 80954E70 8FA40018 */  lw          $a0, 0x18($sp)
    /* 849C44 80954E74 2405000B */  addiu       $a1, $zero, 0xB
    /* 849C48 80954E78 0C025413 */  jal         mLd_SetFreeStrLandMuraName
    /* 849C4C 80954E7C 24840004 */   addiu      $a0, $a0, 0x4
    /* 849C50 80954E80 8FBF0014 */  lw          $ra, 0x14($sp)
    /* 849C54 80954E84 27BD0018 */  addiu       $sp, $sp, 0x18
    /* 849C58 80954E88 03E00008 */  jr          $ra
    /* 849C5C 80954E8C 00000000 */   nop
endlabel func_80954E0C_jp
```

# Rules

- In order to decompile this function, you may need to create new types. Include them on the result.

- SHOW THE ENTIRE CODE WITHOUT CROPPING.
