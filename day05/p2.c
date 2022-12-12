#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#define CRATES_HEIGHT 8
#define CRATES_LENGTH 9

void splice(int *arr, int count) {
    int len = arr[0];
    for(int i = 1; i <= len - count; i++) {
        arr[i] = arr[i + count];
    }
    for(int i = len - count + 1; i <= len; i++) {
        arr[i] = 0;
    }
    arr[0] -= count;
}

void insert(int *arr, int n) {
    int len = arr[0];
    for(int i = len + 1; i > 1; i--) {
        arr[i] = arr[i - 1];
    }
    arr[1] = n;
    arr[0]++;
}

int main()
{
    char *filename = "input.txt";
    FILE *file = fopen(filename, "r");
    char line[256];
    char crateLines[CRATES_HEIGHT][50];
    int crates[CRATES_LENGTH][100];
    int crateLinesNum = 0;

    // Get crates
    while(fgets(line, sizeof(line), file)) {
        if(line[1] == '\0') {
            break;
        }
        strncpy(crateLines[crateLinesNum++], line, strlen(line) + 1);
    }

    for(int i = 1, j = 0; i < strlen(crateLines[0]); i += 4, j++) {
        crates[j][0] = 0;
        for(int k = 0; k < CRATES_HEIGHT; k++) {
            char crate = crateLines[k][i];
            if(crate != ' ') {
                crates[j][0]++;
                crates[j][crates[j][0]] = crate;
            }
        }
    }

    // Move crates
    while(fgets(line, sizeof(line), file)) {
        int moves[3];
        char *lineSplit = strtok(line, " ");
        for(int i = 0, j = 0; lineSplit != NULL; i++) {
            if(i % 2) {
                moves[j++] = atoi(lineSplit);
            }
            lineSplit = strtok(NULL, " ");
        }
        for(int i = moves[0]; i > 0; i--) {
            insert(crates[moves[2] - 1], crates[moves[1] - 1][i]);
        }
        splice(crates[moves[1] - 1], moves[0]);
    }

    // Print crates on top
    for(int i = 0; i < CRATES_LENGTH; i++) {
        printf("%c", crates[i][1]);
    }
    
    fclose(file);
    return 0;
}